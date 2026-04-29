import { useEffect, useState } from "react"
import { Form, Row, Col, Spinner } from "react-bootstrap"

const AddAddressForm = ({
  formIdPrefix = "addr",
  onValidationChange,
  address,
  setAddress,
}) => {
  const [provinces, setProvinces] = useState([])
  const [comuni, setComuni] = useState([])
  const [selectedProvince, setSelectedProvince] = useState("")
  const [isLoadingComuni, setIsLoadingComuni] = useState(false)

  // Fetch Provinces on Mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("http://localhost:3001/province")
        const data = await response.json()
        setProvinces(data)
        console.log(data)
      } catch (error) {
        console.error("Error fetching provinces:", error)
      }
    }
    fetchProvinces()
  }, [])

  // Fetch Comuni when Provincia changes
  useEffect(() => {
    if (selectedProvince === "") return

    let isIgnore = false
    const fetchComuni = async () => {
      setIsLoadingComuni(true)
      try {
        const response = await fetch(
          `http://localhost:3001/provincia?sigla=${selectedProvince}`,
        )
        const data = await response.json()
        if (!isIgnore) setComuni(data)
        console.log("comuni", data)
      } catch (error) {
        console.error(error)
      } finally {
        if (!isIgnore) setIsLoadingComuni(false)
      }
    }

    fetchComuni()
    return () => {
      isIgnore = true
    }
  }, [selectedProvince])

  // handle province change effect on comuni
  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedAddress = { ...address, [name]: value }
    setAddress(updatedAddress)

    if (name === "provincia") {
      setSelectedProvince(value)
      setAddress({ ...updatedAddress, comune: "" })
      setComuni([])
    }

    const isFormValid = e.target.form.checkValidity() ?? false
    if (onValidationChange) onValidationChange(isFormValid)
  }

  return (
    <>
      <Form.Group
        className="mb-3"
        controlId={`${formIdPrefix}-via`}
      >
        <Form.Label>Via / Corso</Form.Label>
        <Form.Control
          required
          name="via"
          value={address.via}
          onChange={handleChange}
          placeholder="es. Corso Vittorio II"
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group
          as={Col}
          md="3"
          controlId={`${formIdPrefix}-civico`}
        >
          <Form.Label>Civico</Form.Label>
          <Form.Control
            required
            name="civico"
            value={address.civico}
            onChange={handleChange}
            placeholder="42"
          />
        </Form.Group>

        <Form.Group
          as={Col}
          md="3"
          controlId={`${formIdPrefix}-cap`}
        >
          <Form.Label>CAP</Form.Label>
          <Form.Control
            required
            name="cap"
            value={address.cap}
            onChange={handleChange}
            placeholder="12345"
          />
        </Form.Group>

        <Form.Group
          as={Col}
          md="6"
          controlId={`${formIdPrefix}-localita`}
        >
          <Form.Label>Località</Form.Label>
          <Form.Control
            required
            name="localita"
            value={address.localita}
            onChange={handleChange}
            placeholder="Roma"
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group
          as={Col}
          controlId={`${formIdPrefix}-provincia`}
        >
          <Form.Label>Provincia</Form.Label>
          <Form.Select
            required
            name="provincia"
            value={address.provincia || ""}
            onChange={handleChange}
          >
            <option value="">Seleziona...</option>
            {provinces.map((p) => (
              <option
                key={p.id}
                value={p.sigla}
              >
                {p.nome} - {p.sigla}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group
          as={Col}
          controlId={`${formIdPrefix}-comune`}
        >
          <Form.Label>
            Comune{" "}
            {isLoadingComuni && (
              <Spinner
                animation="border"
                size="sm"
                className="ms-2"
              />
            )}
          </Form.Label>
          <Form.Select
            required
            name="comune"
            value={address.comune || ""}
            onChange={handleChange}
            disabled={selectedProvince === "" || isLoadingComuni}
          >
            <option value="">
              {isLoadingComuni ? "Caricamento..." : "Seleziona..."}
            </option>
            {comuni.map((c) => (
              <option
                key={c.id}
                value={c.id}
              >
                {c.nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
    </>
  )
}

export default AddAddressForm
