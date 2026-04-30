import { useEffect, useState } from "react"
import { Container, Button, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import ClientiTable from "./ClientiTable"

function Home() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [showClienti, setShowCliente] = useState(false)
  const [clientiData, setClientiData] = useState([])

  const fetchClienti = async () => {
    const response = await fetch("http://localhost:3001/clienti", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    setShowCliente(true)
    const data = await response.json()
    console.log(data.content)
    setClientiData(data.content)
  }

  const handleLogOut = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  useEffect(() => {
    if (!token) navigate("/login")
  }, [])

  return (
    <>
      <Container className="h-100 p-5 text-center fluid">
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
        </Row>{" "}
        {showClienti && <ClientiTable clienti={clientiData} />}
      </Container>
    </>
  )
}

export default Home
