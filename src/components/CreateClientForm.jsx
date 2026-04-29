import { Col, Container, Row } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import AddAddressForm from "./AddAddressForm"

function CreateClientForm() {
  return (
    <Container
      className="mt-5 bg-grey"
      fluid="sm"
    >
      <h1 className="text-center pb-4">Inserisci i dati della Azienda</h1>
      <Form>
        <h5>Dati aziendale</h5>
        <div className="border rounded p-3 mb-3">
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
                  type="text"
                  placeholder="Inserisce la ragione sociale"
                />
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
                  type="text"
                  placeholder="Inserisce la partita IVA"
                />
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
                <Form.Label>Indirizzo email</Form.Label>
                <br />
                <Form.Control
                  type="email"
                  placeholder="Inserisci la email aziendale"
                />{" "}
                <Form.Text className="text-muted ">
                  Non condivideremo mai il tuo indirizzo e-mail con nessuno.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col>
              {/*  pec  */}
              <Form.Group
                className="mb-3"
                controlId="formPec"
              >
                <Form.Label>Email PEC</Form.Label>
                <br />
                <Form.Control
                  type="email"
                  placeholder="Inserisce la pec"
                />
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
                <br />
                <Form.Select aria-label="Default select example">
                  {/*  build the loop based on the types available - make endpoint for this? */}
                  <option>Open this select menu</option>
                  <option value="PA">PA</option>
                  <option value="SAS">SAS</option>
                  <option value="SPA">SPA</option>
                  <option value="SRL">SRL</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              {" "}
              {/*  fatturato anuale */}
              <Form.Group
                className="mb-3"
                controlId="formFatturatoAnuale"
              >
                <Form.Label>Fatturato Anuale</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  placeholder="Inserisce il fatturato anuale"
                />
              </Form.Group>
            </Col>
            <Col>
              {" "}
              {/*  telefono aziendale */}
              <Form.Group
                className="mb-3"
                controlId="formTelAzienda"
              >
                <Form.Label>Telefono aziendale</Form.Label>
                <br />
                <Form.Control
                  type="number"
                  placeholder="Inserisce il telefono"
                />
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
                  type="text"
                  placeholder="Nome persona di contatto"
                />
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
                  type="text"
                  placeholder="Cognome persona di contatto"
                />
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
                <br />
                <Form.Control
                  type="email"
                  placeholder="Inserisce la mail"
                />
              </Form.Group>
            </Col>

            {/*  telefono contatto */}
            <Col>
              <Form.Group
                className="mb-3"
                controlId="formTelContatto"
              >
                <Form.Label>Telefono di contatto</Form.Label>
                <br />
                <Form.Control
                  type="number"
                  placeholder="Inserisce il telefono"
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
        <h5>Indirizzi</h5>
        <div className="border rounded p-3 mb-3">
          <Form.Group>
            <AddAddressForm />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formSedeOperativa"
          >
            <Form.Check
              type="checkbox"
              label="Sede Legale diversa della sede Operativa?"
            />
          </Form.Group>
          {/* {formSedeOperativa ? <AddAddressForm /> : ""} */}
          <Form.Group>{/* AddAdressForm */}</Form.Group>
        </div>

        <Button
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default CreateClientForm
