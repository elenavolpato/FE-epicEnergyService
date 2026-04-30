import { useEffect, useState } from "react"
import { Container, Button, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [showClienti, setShowCliente] = useState(false)

  const fetchClienti = async () => {
    const response = await fetch("http://localhost:3001/clienti", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    setShowCliente(true)
    const data = await response.json()
    console.log("here", data)
  }

  const handleLogOut = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  useEffect(() => {
    if (!token) navigate("/login")
  }, [])

  return (
    <Container className="vh-100 p-5 text-center">
      <Row>
        <Col>
          <Button
            variant="primary"
            onClick={() => navigate("/register/client")}
          >
            Registra cliente nuovo
          </Button>
        </Col>
        <Col>
          <Button
            variant="primary"
            onClick={() => fetchClienti()}
          >
            Vedi tutti i clienti
          </Button>
        </Col>

        <Col>
          <Button
            variant="danger"
            onClick={() => handleLogOut()}
          >
            Log out
          </Button>
        </Col>
      </Row>
      {showClienti}
    </Container>
  )
}

export default Home
