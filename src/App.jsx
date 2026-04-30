import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import "./App.css"
import CreateClientForm from "./components/CreateClientForm"
import "bootstrap/dist/css/bootstrap.min.css"
import CreateUtenteForm from "./components/CreateUtenteForm"
import LoginForm from "./components/LoginForm"
import Home from "./components/Home"
import AddLogo from "./components/AddLogo"
function App() {
  return (
    <div
      data-bs-theme="dark"
      className="bg-dark text-white vh-100"
    >
      <BrowserRouter>
        <h1 className="text-warning text-center pt-3">EPIC Energy Services</h1>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" />}
          />
          <Route
            path="/register/client"
            element={<CreateClientForm />}
          />
          s
          <Route
            path="/register/user"
            element={<CreateUtenteForm />}
          />
          <Route
            path="/login"
            element={<LoginForm />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/register/client/logo/:clienteId"
            element={<AddLogo />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
