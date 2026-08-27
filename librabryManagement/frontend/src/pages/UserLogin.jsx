import axios from "axios"
import { toast } from "react-toastify"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const UserLogin = () => {
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
        <div className="row mb-2 ">
          <div className="col-md-8 mx-auto">
            <div className="mb-2 text-center">
              <h3 className="fw-semibold mb-1">
                <i className="fa-solid fa-user text-primary"></i>
                  User Login</h3>
         
              <p className="text-muted small">
                 Please enter your login crendials to access your account.
              </p>
            </div>
          </div>
        </div>

            <div className="row">
                <div className="col-md-6 mx-auto">
                 <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">

                <form onSubmit={handlesubmit}>

                  <div className="mb-3">
                    <label className="form-label small fw-medium">Email or Student Id</label>
                         <input type="text" className="form-control" placeholder="Enter email or student Id"
                        required value={formdata.login_id} name="login_id"
                        onChange={handleChange}
                      />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-medium">Password</label>
                         <input type="password" className="form-control" placeholder="Enter password"
                        required value={formdata.password} name="password"
                        onChange={handleChange}
                      />
                  </div>

                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Logging in...</>) : (<>
                          <i className="fa-solid fa-user-plus me-2"></i>
                        Login </>)}
                  </button>
                   <p className="text-center text-muted small mt-2">You don't have account. <Link to="/user/signup">Register now</Link></p>

                </form>

              </div>
            </div>
                </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
