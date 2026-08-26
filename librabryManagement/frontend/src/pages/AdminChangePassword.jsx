import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import {  useEffect,useState } from "react"

const AdminChangePassword= () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() =>{
        if(!adminUser){
            navigate("/admin/login")
        }

    },[])


    const handlesubmit = async (e) => {
        e.preventDefault();

        if(newPassword !== confirmPassword){
            toast.error("New password and confirm password do not match")
            return;
        }

        if(newPassword.length < 6){
            toast.error("New password must be at least 6 characters long")
            return;
        }
        setLoading(true);

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/change_admin_password/",
                {username: adminUser,
                 current_password: currentPassword,
                 new_password: newPassword,
                 confirm_password: confirmPassword
                }
            );
            if (res.data.success) {
              toast.success(res.data.message || "Password changed successfully")
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
            }
            else{
              toast.error(res.data.message || "Failed to change password")
            }
        }
        catch (err){
            console.error(err)
            if(err.response && err.response.data && err.response.data.message){
                toast.error(err.response.data.message);
            }
            else{
                toast.error("Something went wrong")
            }
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
        <div className="row mb-4 mx-auto">
          <div className="col-md-12">
            <div className="mb-4 text-center">
              <h3 className="fw-semibold mb-1">
                <i className="fa-solid fa-user-pen text-primary"></i>
                Admin Change Password</h3>
         
              <p className="text-muted small">
                Update your account's password here.
              </p>
            </div>
          </div>
        </div>

            <div className="row g-4">
                <div className="col-md-8 mx-auto">
                 <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">

                <form onSubmit={handlesubmit}>

                  <div className="mb-3">
                    <label className="form-label small fw-medium">
                     Current Password
                    </label>
                      <div className="input-group">
                        <span className="input-group-text bg-white ">
                            <i className="fa-solid fa-lock"></i>
                        </span>
                         <input type={showCurrent ? "text" : "password"}
                          className="form-control"
                        placeholder="Enter current password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                        <button type="button" className="btn btn-outline-secondary"
                         onClick={() => setShowCurrent(!showCurrent)}>
                        {showCurrent ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                        </button>
                      </div>
                  </div>

                      <div className="mb-3">
                    <label className="form-label small fw-medium">
                     New Password
                    </label>
                      <div className="input-group">
                        <span className="input-group-text bg-white ">
                            <i className="fa-solid fa-key"></i>
                        </span>
                         <input type={showNew ? "text" : "password"}
                          className="form-control"
                        placeholder="Enter new password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                        <button type="button" className="btn btn-outline-secondary"
                         onClick={() => setShowNew(!showNew)}>
                        {showNew ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                        </button>
                      </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-medium">
                     Confirm Password
                    </label>
                      <div className="input-group">
                        <span className="input-group-text bg-white ">
                            <i className="fa-solid fa-key"></i>
                        </span>
                         <input type={showConfirm ? "text" : "password"}
                          className="form-control"
                        placeholder="Confirm new password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                        <button type="button" className="btn btn-outline-secondary"
                         onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                        </button>
                      </div>
                  
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Changing...</>) : (<>
                          <i className="fa-solid fa-key me-2"></i>
                        Change Password</>)}
                  </button>

                </form>

              </div>
            </div>
                </div>
        </div>
      </div>
    </div>
  )
}

export default AdminChangePassword
