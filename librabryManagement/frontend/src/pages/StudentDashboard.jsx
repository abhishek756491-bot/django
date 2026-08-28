import axios from "axios"
import { Icons, toast } from "react-toastify"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const StudentDashboard = () => {
    const [formdata, setFormdata] = useState({
        login_id: "",
        password: "",
    });

    const Navigate = useNavigate()
    
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        });
    }
   
    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/user/login/",formdata
                
            );
            if (res.data.success) {
              localStorage.setItem("studentUser",JSON.stringify(res.data))
              toast.success(`Login successful!.`)
              Navigate("/user/dashboard")
              setFormdata({
                login_id: "",
                password: "",
              });
              
            }
            else{
              toast.error(res.data.message || "Login failed");
            }
        }
        catch (err){
            console.error(err)
            toast.error(err.response?.data?.message || "invalid login. please try again")
        }
        finally{
            setLoading(false)
        }
    }
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
        <p className="mt-3">Welcome Test User</p>
       </div>

       {loading && (
        <div className="text-center my-5">
            <div className="spinner-boarder text-primary" role="status">
              <span className="mt-3 text-muted">Loading...</span>
            </div>

        </div>
       )}

       {!loading && (
        <div className="row g-4 mb-4">
            <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-body d-flex flex-column">
                        <div>
                            <h6 className="text-uppercase text-muted mb-1 small">Total Books</h6>
                            <h3 className="mb-0">5</h3>
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
       )}
      </div>
    </div>
  )
}

export default StudentDashboard
