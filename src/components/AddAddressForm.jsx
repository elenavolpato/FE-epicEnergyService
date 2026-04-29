import { useState } from "react"
import { Form, Row, Col } from "react-bootstrap"

const AddAddressForm = ({ ids, formIdPrefix = "addr", onSubmitAddress }) => {
  const [validated, setValidated] = useState(false)
  const [address, setAddress] = useState({
    via: "",
    civico: "",
    localita: "",
    cap: "",
    comune: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()

    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      const finalData = { ...ids, ...address }
      if (onSubmitAddress) onSubmitAddress(finalData)
    }
    setValidated(true)
  }

  return (
    <>
      <h4 className="mb-4">Nuovo Indirizzo</h4>

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        {/* Use formIdPrefix to ensure unique HTML IDs */}
        <Form.Group
          className="mb-3"
          controlId={`${formIdPrefix}-via`}
        >
          <Form.Label>Via / Corso</Form.Label>
          <Form.Control
            required
            name="via"
            type="text"
            value={address.via}
            onChange={handleChange}
            placeholder="es. Corso Vittorio II"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group
            as={Col}
            controlId={`${formIdPrefix}-civico`}
          >
            <Form.Label>Civico</Form.Label>
            <Form.Control
              required
              name="civico"
              type="text"
              value={address.civico}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId={`${formIdPrefix}-cap`}
          >
            <Form.Label>CAP</Form.Label>
            <Form.Control
              required
              name="cap"
              type="text"
              value={address.cap}
              onChange={handleChange}
            />
          </Form.Group>{" "}
          <Form.Group
            as={Col}
            controlId={`${formIdPrefix}-localita`}
          >
            <Form.Label>Località</Form.Label>
            <Form.Control
              required
              name="localita"
              type="text"
              value={address.localita}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            controlId={`${formIdPrefix}-comune`}
          >
            <Form.Label>Provincia</Form.Label>
            {/* Insert API fetch and generate dropdown here */}
            <Form.Control
              required
              name="comune"
              type="text"
              value={address.comune}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId={`${formIdPrefix}-comune`}
          >
            <Form.Label>Comune</Form.Label>
            {/* Insert API fetch and generate dropdown here */}
            <Form.Control
              required
              name="comune"
              type="text"
              value={address.comune}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
      </Form>
    </>
  )
}

export default AddAddressForm
