import axios from "axios"
import { toast } from "react-toastify"
import { useState } from "react"
import { Link } from "react-router-dom"

const UserSignUp = () => {
    const [formdata, setFormdata] = useState({
        full_name: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        });
    }
   
    const handlesubmit = async (e) => {
        e.preventDefault();

        if(formdata.password !== formdata.confirmPassword){
            toast.error("password do not match")
            return;
        }

        if(formdata.password.length < 6){
            toast.error("Password must be at least 6 characters long")
            return;
        }
        setLoading(true);

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/user/signup/",formdata
                
            );
            if (res.data.success) {
              toast.success(`Registration successful!.Your student Id is ${res.data.student_id}`)
              setFormdata({
                full_name: "",
                mobile: "",
                email: "",
                password: "",
                confirmPassword: ""
              });
            }
            else{
              toast.error(res.data.message || "Registration failed");
            }
        }
        catch (err){
            console.error(err)
            toast.error(err.response?.data?.message || "An error occured during registration")
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
        <div className="row mb-3 ">
          <div className="col-md-8 mx-auto">
            <div className="mb-2 text-center">
              <h3 className="fw-semibold mb-1">
                <i className="fa-solid fa-user-plus text-primary"></i>
                  User SignUp</h3>
         
              <p className="text-muted small">
                Create your account by filling the form below.
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
                    <label className="form-label small fw-medium">Full name</label>
                         <input type="text" className="form-control" placeholder="Enter Full Name"
                        required value={formdata.full_name} name="full_name"
                        onChange={handleChange}
                      />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-medium">Mobile Number</label>
                         <input type="number" className="form-control" placeholder="Enter Mobile Number"
                        required value={formdata.mobile} name="mobile"
                        onChange={handleChange}
                      />
                  </div>

                  
                  <div className="mb-3">
                    <label className="form-label small fw-medium">Email</label>
                         <input type="email" className="form-control" placeholder="Enter Email"
                        required value={formdata.email} name="email"
                        onChange={handleChange}
                      />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-medium">Password</label>
                         <input type="password" className="form-control" placeholder="Enter Password"
                        required value={formdata.password} name="password"
                        onChange={handleChange}
                      />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-medium">Confirm Password</label>
                         <input type="password" className="form-control" placeholder="Enter conform password"
                        required value={formdata.confirmPassword} name="confirmPassword"
                        onChange={handleChange}
                      />
                  </div>

                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Registering...</>) : (<>
                          <i className="fa-solid fa-user-plus me-2"></i>
                        Register now</>)}
                  </button>
                   <p className="text-center text-muted small mt-2">Already haven account? <Link to="/user/login">Login here</Link></p>

                </form>

              </div>
            </div>
                </div>
        </div>
      </div>
    </div>
  )
}

export default UserSignUp
