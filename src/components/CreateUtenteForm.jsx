import { useState } from "react"
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap"

function CreateUtenteForm() {
  const [validated, setValidated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nome: "",
    cognome: "",
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
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      console.log(formData)
      if (!response.ok) throw new Error("Errore durante la registrazione")

      const data = await response.json()
      console.log("response body", data)

      setSuccess(true)
      setValidated(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container
      className="py-5"
      style={{ maxWidth: 500 }}
    >
      <h4 className="mb-4">Registrazione</h4>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">Registrazione avvenuta con successo!</Alert>
      )}

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        {/* Username */}
        <Form.Group
          className="mb-3"
          controlId="formUsername"
        >
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="mario_rossi"
          />
        </Form.Group>

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
          <Form.Control.Feedback type="invalid">
            L'email inserita non è nel formato corretto, inserire una mail
            valida.
          </Form.Control.Feedback>
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
            placeholder="Min. 8 caratteri"
            minLength={8}
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
          />
          <Form.Control.Feedback type="invalid">
            La password deve contenere almeno 8 caratteri, una lettera
            maiuscola, una minuscola e un numero.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Almeno 8 caratteri, una maiuscola, una minuscola e un numero.
          </Form.Text>
        </Form.Group>

        {/* Nome & Cognome */}
        <Row>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="formNome"
            >
              <Form.Label>Nome</Form.Label>
              <Form.Control
                required
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Mario"
                minLength={2}
                maxLength={30}
              />
              <Form.Control.Feedback type="invalid">
                Il nome deve essere compreso tra i 2 e i 30 caratteri.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="formCognome"
            >
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                required
                type="text"
                name="cognome"
                value={formData.cognome}
                onChange={handleChange}
                placeholder="Rossi"
                minLength={2}
                maxLength={30}
              />
              <Form.Control.Feedback type="invalid">
                Il cognome deve essere compreso tra i 2 e i 30 caratteri.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant="primary"
          type="submit"
          disabled={isLoading}
          className="w-100"
        >
          {isLoading ? "Registrazione in corso..." : "Registrati"}
        </Button>
      </Form>
    </Container>
  )
}

export default CreateUtenteForm
