import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from './pages/AdminDashboard'
import AddCategory from './components/AddCategory'
import ManageCategories from './pages/ManageCategories'

const App = () => {
  return (
    <div>
      <Header/>
      <ToastContainer position='top-right' autoClose={2000}/>

      <Routes>
        <Route  path='/admin/login' element={<AdminLogin/>}></Route>
        <Route  path='/admin/dashboard' element={<AdminDashboard/>}></Route>
        <Route  path='/admin/category_add' element={<AddCategory/>}></Route>
        <Route  path='/admin/category_manage' element={<ManageCategories/>}></Route>
      </Routes>
    </div>
  )
}

export default App
