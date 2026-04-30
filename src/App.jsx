import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import CreateClientForm from "./components/CreateClientForm"
import "bootstrap/dist/css/bootstrap.min.css"
import CreateUtenteForm from "./components/CreateUtenteForm"
function App() {
  return (
    <div
      data-bs-theme="dark"
      className="bg-dark text-white"
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/register/client"
            element={<CreateClientForm />}
          />
          <Route
            path="/lala"
            element={<CreateUtenteForm />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
