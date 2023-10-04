import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './Components/Nav'
import Home from './Components/Home'
import Footer from './Components/Footer'
import SignUp from './Components/SIgnUp'
import Private from "./Components/Private"
import Login from './Components/Login'
import AddProduct from './Components/AddProduct'

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>

          {/* Protected Routes */}
        <Route element={<Private />}>
          <Route path='/' element={<h1><Home /></h1>} />
          <Route path='/add' element={<AddProduct/>} />
          <Route path='/update' element={<h1>Update Product</h1>} />
          {/* <Route path='/logout' element={<h1>Logout Product</h1>} /> */}
          <Route path='/profile' element={<h1>Profile</h1>} />
        </Route>

        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <Footer />
    </Router>


  )
}

export default App