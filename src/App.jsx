import './App.css'
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { DashBoard } from './pages/Dashboard/DashBoard';
import { Home } from './pages/Home'
import { Routes, Route} from "react-router";


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>
    </Routes>
    </>
  )
}

export default App
