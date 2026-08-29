import axios from "axios"
import { toast } from "react-toastify"
import { useState,useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const StudentDashboard = () => {
    const [stats, setStats] = useState({
        total_books : 0,
        total_issued : 0,
        not_returned : 0,
    });

    const Navigate = useNavigate()
    
    const [loading, setLoading] = useState(true);

    const studentUser = JSON.parse(localStorage.getItem("studentUser"));

    useEffect(() => {
      if(!studentUser){
        Navigate("user/login");
        return;
      }
        const fetchStats = async () =>{
          try{
            setLoading(true)
            const res = await axios.get("http://127.0.0.1:8000/api/user_stats/", {
               params:{student_id: studentUser.student_id}});
            setStats(res.data.stats);
          }catch(err){
            console.log(err);
            toast.error("Failed to fetch stats")
          }
          finally{
            setLoading(false)
          }
        };
     fetchStats();
      },[]
    )
  return (
    <div
      className="py-5"
      style={{
        background: "linear-gradient(135deg,#f3f4ff,#fdfbff)",
        minHeight: "100vh"
      }}
    >
      <div className="container">
       <div className="d-flex  flex-wrap justify-content-between align-item-center mb-4">
        <div >
              <h3 className="mb-1 d-flex align-items-center gap-2">
                <span className="d-inline-flex align-items-center justify-content-center rounded-circle border-3" 
                     style={{width:"40Px", height:"40px", background:"#0f766e1a"}}>
                    
                    <i className="fa-solid fa-user-graduate text-primary"></i>
                </span>
                <span>My library Dashboard</span>
              </h3>

        </div>
        <p className="mt-3">Welcome {studentUser.full_name}</p>
       </div>

       {loading && (
        <div className="text-center my-5">
            <div className="spinner-boarder text-primary" role="status"></div>
              <span className="mt-3 text-muted">Loading...</span>
        </div>
       )}

       {!loading && (
        <div className="row g-4 mb-4">
            <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h6 className="text-uppercase text-muted mb-1 small">Total Books</h6>
                            <h3 className="mb-0">{stats.total_books}</h3>
                        </div>
                        <div className="rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{width:"40px", height:"42px",background:"#e0e76ff"}}>
                            <i className="fa-solid fa-layer-group text-primary"></i>

                        </div>
                    </div>
                    <p className="text-muted mb-0 small">
                        All books currently availale in the library catalogue.
                    </p>
                    <div className="mt-3">
                      <Link to="/user/books" className="small text-primary text-decoration-non">
                      View Books <i className="fa-solid fa-arrow-right"></i></Link>

                    </div>
                  </div>
                </div>
            </div>

              <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100"
                style={{background: "linear-gradient(135deg, #f97316, #f97716cc, #894a8f)", color:"white"}}>
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h6 className="text-uppercase text-muted mb-1 small">Pending returns</h6>
                            <h3 className="mb-0">{stats.not_returned}</h3>
                        </div>
                        <div className="rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{width:"40px", height:"42px",background:"#e0e76ff"}}>
                            <i className="fa-solid fa-layer-group text-primary"></i>

                        </div>
                    </div>
                    <p className="text-muted mb-0 small">
                       Books that are due for return but  haven't been returned yet. Please return on time to avoid late fees.
                    </p>
                  </div>
                </div>
            </div>

                     <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h6 className="text-uppercase text-muted mb-1 small">Total Books Issued</h6>
                            <h3 className="mb-0">{stats.total_issued}</h3>
                        </div>
                        <div className="rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{width:"40px", height:"42px",background:"#e0e76ff"}}>
                            <i className="fa-solid fa-layer-group text-primary"></i>

                        </div>
                    </div>
                    <p className="text-muted mb-0 small">
                        Count of all books issued to you.
                    </p>
                    <div className="mt-3">
                      <Link to="/user/books" className="small text-primary text-decoration-non">
                      View issued history <i className="fa-solid fa-arrow-right"></i></Link>
                     
                    </div>
                  </div>
                </div>
            </div>
        </div>
       )}
      </div>
    </div>
  )
}

export default StudentDashboard
