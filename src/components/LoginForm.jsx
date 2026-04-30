import { useState } from "react"
import { Container, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function LoginForm() {
  const [validated, setValidated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!form.checkValidity()) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error("Credenziali non valide")

      const data = await response.json()
      console.log("response", data)

      // save token
      localStorage.setItem("token", data.accessToken)

      navigate("/home")

      setValidated(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container
      className="py-5 vh-100"
      style={{ maxWidth: 500 }}
    >
      <h4 className="mb-4">Registrazione</h4>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        {/* Email */}
        <Form.Group
          className="mb-3"
          controlId="formEmail"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="mario@example.it"
          />
          <Form.Control.Feedback type="invalid">Inserisci un'email valida</Form.Control.Feedback>
        </Form.Group>

        {/* Password */}
        <Form.Group
          className="mb-3"
          controlId="formPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="La tua password"
          />
          <Form.Control.Feedback type="invalid">Inserisci la tua password</Form.Control.Feedback>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={isLoading}
          className="w-100"
        >
          {isLoading ? "Acesso in corso..." : "Login"}
        </Button>
        <div className="text-center">
          <p className="pt-5">Non sei ancora un cliente?</p>
          <Button
            variant="warning"
            onClick={() => navigate("/register/user")}
          >
            Registrati
          </Button>
        </div>
      </Form>
    </Container>
  )
}
export default LoginForm
