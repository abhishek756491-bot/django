import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from './pages/AdminDashboard'
import AddCategory from './components/AddCategory'
import ManageCategories from './pages/ManageCategories'
import AddAuthor from './pages/AddAuthor'
import ManageAuthors from './pages/ManageAuthors'
import AddBook from './pages/AddBook'
import ManageBooks from './pages/ManageBooks'
import AdminChangePassword from './pages/AdminChangePassword'
import UserSignUp from './pages/userSignUp'
import UserLogin from './pages/UserLogin'
import StudentDashboard from './pages/StudentDashboard'
import StudentBooks from './pages/StudentBooks'
import StudentProfile from './pages/StudentProfile'
import StudentChangePassword from './pages/StudentChangePassword'
import ManageStudents from './pages/ManageSudent'

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
        <Route  path='/admin/author_add' element={<AddAuthor/>}></Route>
        <Route  path='/admin/author_manage' element={<ManageAuthors/>}></Route>
        <Route  path='/admin/book_add' element={<AddBook/>}></Route>
        <Route  path='/admin/book_manage' element={<ManageBooks/>}></Route>
        <Route  path='/admin/change_password' element={<AdminChangePassword/>}></Route>
        <Route  path='/user/signup' element={<UserSignUp/>}/>
        <Route  path='/user/login' element={<UserLogin/>}/>
        <Route path='/user/dashboard' element={<StudentDashboard/>}/>
        <Route path='/user/books' element={<StudentBooks/>}/>
        <Route path='/user/profile' element={<StudentProfile/>}></Route>
        <Route path='/user/change_password' element={<StudentChangePassword/>}></Route>
        <Route path='/admin/manage_students' element={<ManageStudents/>}></Route>
      </Routes>
    </div>
  )
}

export default App
