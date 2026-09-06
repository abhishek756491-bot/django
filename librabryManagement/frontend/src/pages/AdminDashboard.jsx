import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


const AdminDashboard = () => {
  const adminUser = localStorage.getItem("adminUser")
  const navigate = useNavigate()

  const [stats,setStats] = useState(null)
  const [loading,setLoading] = useState(false)

  useEffect(() =>{
    if(!adminUser){
      navigate("/admin/login");
      return;
    }
    fetchStats()
  },[])

  const fetchStats = async () =>{
    setLoading(true);
    try{
      const res = await axios.get("http://localhost:8000/api/admin/stats/");
        setStats(res.data)
    }
    catch (error){
       console.error(error)
       toast.error("Filed to load admin stats")
    }finally{
      setLoading(false)
    }
  };
  
  return (
    <div
      className="py-5"
      style={{
        background: "linear-gradient(135deg,#f3f4ff,#fdfbff)",
        minHeight: "100vh"
      }}
    >
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-8 mx-auto d-flex justify-content-between align-items-center">
            <div className="mb-4 text-center">
              <h3 className="fw-semibold mb-1">
                <i className="fa-solid fa-gauge-high text-primary"></i>
                Admin Dashboard
              </h3>

              <p className="text-muted small">
                Quick overview of library stats and activities
              </p>
              
            </div>
            <div className="badge bg-primary-subtle text-primary py-2 px-3 rounded-pill">
               <i className="fa-solid fa-shield-halved"></i> Admin Panel
            </div>
          </div>
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary " role="role=status">
                <span className="visually-hidden">Loading...</span>
                </div>
            </div>
          ) }

          {!loading  && stats && (
            <>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="card-border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body d-flex">
                    <div className="me-3 d-flex align-items-center">
                      <span className="rounded-circle d-inline-flex 
                      align-items-center justify-content-center"
                      style={{
                        width:"50px",
                        height:"50px",
                        background:"#eef2ff",
                        color:"#4f46e5"
                      }}>
                        <i className="fa-solid fa-user-graduate"></i>
                      </span>
                    </div>
                    <div>
                      <p className="text-muted text-uppercase mb-1">
                        total students
                      </p>
                      <p className="fw-semibold text-uppercase mb-1">
                        {stats.total_students}
                      </p>
                      <p className="small mb-0">
                        Unblock : <span className="fw-semibold text-success">{stats.active_students}</span>
                         &nbsp; &nbsp;
                        Block : <span className="fw-semibold text-danger">{stats.blocked_students}</span>
                      </p>
  
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card-border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body d-flex">
                    <div className="me-3 d-flex align-items-center">
                      <span className="rounded-circle d-inline-flex 
                      align-items-center justify-content-center"
                      style={{
                        width:"50px",
                        height:"50px",
                        background:"#eef2ff",
                        color:"#4f46e5"
                      }}>
                        <i className="fa-solid fa-book-open"></i>
                      </span>
                    </div>
                    <div>
                      <p className="text-muted text-uppercase mb-1">
                        total books
                      </p>
                      <p className="fw-semibold text-uppercase mb-1">
                        {stats.total_books}
                      </p>
                      <p className="small mb-0">
                        Abailable : <span className="fw-semibold text-success">{stats.available_books}</span>
                         &nbsp; &nbsp;
                        Out of stock : <span className="fw-semibold text-danger">{stats.out_of_stock}</span>
                      </p>
  
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="col-md-4">
                <div className="card-border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body d-flex">
                    <div className="me-3 d-flex align-items-center">
                      <span className="rounded-circle d-inline-flex 
                      align-items-center justify-content-center"
                      style={{
                        width:"50px",
                        height:"50px",
                        background:"#eef2ff",
                        color:"#4f46e5"
                      }}>
                        <i className="fa-solid fa-arrow-right-arrow-left"></i>
                      </span>
                    </div>
                    <div>
                      <p className="text-muted text-uppercase mb-1">
                        issued records
                      </p>
                      <p className="fw-semibold text-uppercase mb-1">
                        {stats.total_issued}
                      </p>
                      <p className="small mb-0">
                        Currently issued : <span className="fw-semibold text-success">{stats.currently_issued}</span>
                         &nbsp; &nbsp;
                        Returned : <span className="fw-semibold text-danger">{stats.returned_count}</span>
                      </p>
  
                    </div>
                  </div>
                </div>
              </div>
            </div>

             <div className="row g-3">
              <div className="col-md-6">
                <div className="card-border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body d-flex">
                    <div className="me-3 d-flex align-items-center">
                      <span className="rounded-circle d-inline-flex 
                      align-items-center justify-content-center"
                      style={{
                        width:"50px",
                        height:"50px",
                        background:"#eef2ff",
                        color:"#4f46e5"
                      }}>
                        <i className="fa-solid fa-layer-group"></i>
                      </span>
                    </div>
                    <div>
                      <p className="text-muted text-uppercase mb-1">
                        Categories
                      </p>
                      <p className="fw-semibold text-uppercase mb-1">
                        {stats.total_categories}
                      </p>
                      <p className="small text-muted mb-0">
                        Different geners and classifications of books available in the library.
                      </p>
  
                    </div>
                  </div>
                </div>
              </div>

               <div className="col-md-6">
                <div className="card-border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body d-flex">
                    <div className="me-3 d-flex align-items-center">
                      <span className="rounded-circle d-inline-flex 
                      align-items-center justify-content-center"
                      style={{
                        width:"50px",
                        height:"50px",
                        background:"#eef2ff",
                        color:"#4f46e5"
                      }}>
                        <i className="fa-solid fa-user-pen"></i>
                      </span>
                    </div>
                    <div>
                      <p className="text-muted text-uppercase mb-1">
                        Authors
                      </p>
                      <p className="fw-semibold text-uppercase mb-1">
                        {stats.total_authors}
                      </p>
                      <p className="small text-muted mb-0">
                        Writers and contributers of the books available in the library.
                      </p>
  
                    </div>
                  </div>
                </div>
              </div>

            </div>
            </>
          )}
        </div>
          </div>
    </div>
  )
}

export default AdminDashboard
