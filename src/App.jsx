import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import CreateClientForm from "./components/CreateClientForm"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={<CreateClientForm />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
