import Home from "./components/Home"
import './App.css'
import { BrowserRouter, Routes,Route} from "react-router-dom"
import FormWithYup from "./components/FormWithYup"
import  Navbar from "./components/Navbar"



function App() {
  

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="FormWithYup" element={<FormWithYup />}/>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
