import { useState } from "react"
import { Alert, Button, Container, Spinner } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

function AddLogo() {
  const { clienteId } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState(null)
  const token = localStorage.getItem("token")

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("logo", file)

    try {
      setStatus("loading")
      const res = await fetch(`http://localhost:3001/clienti/${clienteId}/logo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: formData,
      })

      if (!res.ok) throw new Error("Upload fallito")

      setStatus("success")
      setTimeout(() => navigate("/register/client"), 1500)
    } catch (err) {
      setStatus("error")
      console.lor(err)
    }

    finishImageAdd()
  }

  const finishImageAdd = () => {
    localStorage.removeItem("clienteId")
  }

  return (
    <Container className="vh-100 d-flex flex-column align-items-center ">
      <div className="border border-light rounded py-4 px-3 mt-3 ">
        <h4>Vuoi aggiungere il logo della Azienda? </h4>
        {status === "loading" && <Spinner animation="border" />}
        {status === "success" && <Alert variant="success">Logo caricato con successo! Reindirizzamento...</Alert>}
        {status === "error" && <Alert variant="danger">Errore durante il caricamento. Riprova.</Alert>}
        {status !== "success" && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={status === "loading"}
            className="pt-2"
          />
        )}
      </div>
      <Button
        onClick={() => navigate("/register/client")}
        disabled={status === "loading"}
        className="mt-5"
        variant="warning"
      >
        No - torna a pagina dati clienti
      </Button>
    </Container>
  )
}

export default AddLogo
