import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import CreateClientForm from "./components/CreateClientForm"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div
      data-bs-theme="dark"
      className="bg-dark text-white"
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={<CreateClientForm />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
