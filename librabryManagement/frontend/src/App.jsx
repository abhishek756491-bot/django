import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <Header/>
      <ToastContainer position='top-right' autoClose={2000}/>

      <Routes>
        <Route  path='/admin/login' element={<AdminLogin/>}></Route>
      </Routes>
    </div>
  )
}

export default App
