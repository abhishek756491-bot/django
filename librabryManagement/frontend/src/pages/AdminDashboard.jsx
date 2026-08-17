


const AdminDashboard = () => {
  const adminuser = localStorage.getItem("adminUser");
  return (
    <div>
      hello {adminuser}
    </div>
  )
}

export default AdminDashboard
