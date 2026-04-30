import { Alert, Col, Container, InputGroup, Row } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import AddAddressForm from "./AddAddressForm"
import { useState } from "react"

function CreateClientForm() {
  const [validated, setValidated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [sedeDiversa, setSedeDiversa] = useState(false)

  const [formData, setFormData] = useState({
    ragioneSociale: "",
    partitaIva: "",
    email: "",
    pec: "",
    tipo: "",
    fatturatoAnuale: "",
    telefono: "",
    nomeContatto: "",
    cognomeContatto: "",
    emailContatto: "",
    telefonoContatto: "",
  })

  const [sedeLegale, setSedeLegale] = useState({
    comune: "",
    via: "",
    civico: "",
    cap: "",
    localita: "",
    provincia: "",
  })

  const [sedeOperativa, setSedeOperativa] = useState({
    comune: "",
    via: "",
    civico: "",
    cap: "",
    localita: "",
    provincia: "",
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

    const stripProvincia = ({ provincia, ...rest }) => rest // ✅ add this

    const payload = {
      ...formData,
      sedeLegale: stripProvincia(sedeLegale), // ✅ strip here
      sedeOperativa: sedeDiversa
        ? stripProvincia(sedeOperativa)
        : stripProvincia(sedeLegale),
    }

    try {
      const response = await fetch("http://localhost:3001/clienti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      console.log(payload)
      if (!response.ok) throw new Error("Errore durante il salvataggio")

      setSuccess(true)
      setValidated(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className="py-5 bg-grey">
      <h1 className="text-warning">EPIC Energy Services</h1>
      <h4 className=" pb-4">Inserisci i dati della Azienda</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">Azienda salvata con successo!</Alert>
      )}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <h5>Dati aziendale</h5>
        <div className="border rounded p-3 mb-3 ">
          <Row>
            <Col>
              {/* ragione sociale */}
              <Form.Group
                className="mb-3"
                controlId="formRagioneSociale"
              >
                <Form.Label>Ragione Sociale</Form.Label>
                <br />
                <Form.Control
                  required
                  type="text"
                  name="ragioneSociale"
                  value={formData.ragioneSociale}
                  onChange={handleChange}
                  placeholder="Nome della Azienda S.P.A."
                />
                <Form.Control.Feedback type="invalid">
                  Campo obbligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* partita IVA */}
            <Col>
              <Form.Group
                className="mb-3"
                controlId="formPartitaIVA"
              >
                <Form.Label>Partita IVA</Form.Label>
                <br />
                <Form.Control
                  required
                  type="text"
                  name="partitaIva"
                  value={formData.partitaIva}
                  onChange={handleChange}
                  placeholder="12345678910"
                />
                <Form.Control.Feedback type="invalid">
                  Campo obbligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              {/* email */}
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label>Indirizzo email aziendale</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contatto@azienda.it"
                />
                <Form.Text className="text-muted">Campo obbligatorio</Form.Text>
              </Form.Group>
            </Col>
            <Col>
              {/*  pec  */}
              <Form.Group
                className="mb-3"
                controlId="formPec"
              >
                <Form.Label>Indirizzo email PEC</Form.Label>
                <br />
                <Form.Control
                  required
                  type="email"
                  name="pec"
                  value={formData.pec}
                  onChange={handleChange}
                  placeholder="azienda@pecmail.it"
                />
                <Form.Control.Feedback type="invalid">
                  Inserisci una PEC valida
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {/*  tipo azienda */}
              <Form.Group
                className="mb-3"
                controlId="formTipoAzienda"
              >
                <Form.Label>Tipo Azienda</Form.Label>
                {/*  build the loop based on the types available - make endpoint for this? */}
                <Form.Select
                  required
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                >
                  <option value="">Seleziona...</option>
                  <option value="PA">PA</option>
                  <option value="SAS">SAS</option>
                  <option value="SPA">SPA</option>
                  <option value="SRL">SRL</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Seleziona un tipo azienda
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              {/*  fatturato anuale */}
              <Form.Group
                className="mb-3"
                controlId="formFatturatoAnuale"
              >
                <Form.Label>Fatturato Anuale in Euro</Form.Label>
                <InputGroup>
                  <InputGroup.Text>€ </InputGroup.Text>
                  <Form.Control
                    required
                    type="number"
                    name="fatturatoAnuale"
                    value={formData.fatturatoAnuale}
                    onChange={handleChange}
                    placeholder="10000"
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Campo obbligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              {/*  telefono aziendale */}
              <Form.Group
                className="mb-3"
                controlId="formTelAzienda"
              >
                <Form.Label>Telefono aziendale</Form.Label>
                <br />
                <InputGroup>
                  <InputGroup.Text>+39 </InputGroup.Text>
                  <Form.Control
                    required
                    type="number"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Inserisce il telefono"
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Campo obbligatorio.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <h5>Dati contatto</h5>
        <div className="border rounded p-3 mb-3">
          <Row>
            <Col>
              {/*  nome  contatto */}
              <Form.Group
                className="mb-3"
                controlId="formNome"
              >
                <Form.Label>Nome persona di contatto</Form.Label>
                <br />
                <Form.Control
                  required
                  type="text"
                  name="nomeContatto"
                  value={formData.nomeContatto}
                  onChange={handleChange}
                  placeholder="Mario"
                />
                <Form.Control.Feedback type="invalid">
                  Campo obbligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/*  cognome  contato */}

            <Col>
              <Form.Group
                className="mb-3"
                controlId="formCognome"
              >
                <Form.Label>Cognome persona di contatto</Form.Label>
                <br />
                <Form.Control
                  required
                  type="text"
                  name="cognomeContatto"
                  value={formData.cognomeContatto}
                  onChange={handleChange}
                  placeholder="Rossi"
                />
                <Form.Control.Feedback type="invalid">
                  Campo obbligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          {/* email persona di contatto */}
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="formEmailPersonaContatto"
              >
                <Form.Label>Email persona di contatto</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="emailContatto"
                  value={formData.emailContatto}
                  onChange={handleChange}
                  placeholder="Inserisce la mail"
                />
                <Form.Control.Feedback type="invalid">
                  Inserisci un'email valida.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/*  telefono contatto */}
            <Col>
              <Form.Group
                className="mb-3"
                controlId="formTelContatto"
              >
                <Form.Label>Telefono di contatto</Form.Label>
                <InputGroup>
                  <InputGroup.Text>+39 </InputGroup.Text>
                  <Form.Control
                    required
                    type="number"
                    name="telefonoContatto"
                    value={formData.telefonoContatto}
                    onChange={handleChange}
                    placeholder="Inserisce il telefono"
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Campo obbligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <h5>Indirizzi</h5>
        <div className="border rounded p-3 mb-3">
          <Form.Group>
            <AddAddressForm
              address={sedeLegale}
              setAddress={setSedeLegale}
              formIdPrefix="legale"
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formSedeOperativa"
          >
            <Form.Check
              type="checkbox"
              label="Sede Legale diversa dalla sede Operativa?"
              checked={sedeDiversa}
              onChange={(e) => setSedeDiversa(e.target.checked)}
            />
          </Form.Group>
          {sedeDiversa && (
            <AddAddressForm
              address={sedeOperativa}
              setAddress={setSedeOperativa}
              formIdPrefix="operativa"
            />
          )}
        </div>

        <Button
          variant="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Salvataggio..." : "Submit"}
        </Button>
      </Form>
    </Container>
  )
}

export default CreateClientForm
