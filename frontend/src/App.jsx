import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './Components/Nav'
import Footer from './Components/Footer'
import SignUp from './Components/SIgnUp'
import Private from "./Components/Private"
import Login from './Components/Login'
import AddProduct from './Components/AddProduct'
import ProductList from './Components/ProductList'
import UpdateProduct from './Components/UpdateProduct'

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>

          {/* Protected Routes */}
        <Route element={<Private />}>
          <Route path='/' element={<ProductList/>} />
          <Route path='/add' element={<AddProduct/>} />
          <Route path='/update/:id' element={<UpdateProduct/>} />
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