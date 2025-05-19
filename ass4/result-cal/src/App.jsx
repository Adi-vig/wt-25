
import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import './style.css'
import HomePage from "./components/HomePage"
import StudentCRUD from "./components/StudentCRUD"
import MarksCRUD from "./components/MarksCRUD"
import ResultPage from "./components/ResultPage"

function App() {
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={ <HomePage/>} />
      <Route path="/students" element={<StudentCRUD/>} />
      <Route path="/marks" element={<MarksCRUD/>}/>
      <Route path="/result" element={<ResultPage/>}/>
      
    </Routes>
    <div className="container text-center mt-5">
    <footer className="footer">
        <p className="text">&copy; Developed by Aditya Sakhare</p>
      </footer>
    </div>
    </Router>
    
    
  )
}

export default App
