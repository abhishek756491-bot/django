import axios from "axios"
import { toast } from "react-toastify"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"

const StudentChangePassword = () => {
    const [profile,setProfile] = useState({
      student_id : "",
      full_name : "",
      email : "",
      mobile : ""
    })
    const [loading, setLoading] = useState(true);
    const [saving,setSaving] = useState(false)


    const Navigate = useNavigate()

    const studentUser = JSON.parse(localStorage.getItem("studentUser"));

    useEffect(() => {
      if(!studentUser){
        Navigate("/user/login");
        return;
      }
        const fetchprofile = async () =>{
          try{
            setLoading(true)
            const res = await axios.get("http://127.0.0.1:8000/api/user/profile/",{
              params:{student_id : studentUser.student_id}});
             setProfile({
              student_id: res.data.student_id,
              full_name: res.data.full_name,
              email: res.data.email,
              mobile: res.data.mobile,
            })
          }catch(err){
            console.log(err);
            toast.error("Failed to fetch profile")
          }
          finally{
            setLoading(false)
          }
        };
     fetchprofile();
      },[]
    )

   const handleChange = (e)=>{
    const { name, value } = e.target
    setProfile((prevprofile) => ({
      ...prevprofile,[name]:value
    }))
   }

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await axios.put("http://127.0.0.1:8000/api/user/profile/",{
        student_id : profile.student_id,
        full_name : profile.full_name,
        email : profile.email,
        mobile : profile.mobile,
      });
      
      toast.success("profile updated successfully");

      const updateUser = {
        ...studentUser,full_name: profile.full_name
      };

      localStorage.setItem("studentUser",JSON.stringify(updateUser)
      );
    }catch(err){
      console.log(err);
      toast.error("Failed to update profile")  
    }
    finally{
      setSaving(false)
    }
   }

    
  return (
    <div
      className="py-5"
      style={{
        background: "linear-gradient(135deg,#f3f4ff,#fdfbff)",
        minHeight: "100vh"
      }}>
    
       <div className="container">
       <div className="d-flex  flex-wrap justify-content-between align-item-center mb-4">
        <div >
              <h3 className="mb-1 d-flex align-items-center gap-2">
                <span className="d-inline-flex align-items-center justify-content-center rounded-circle border-3" 
                     style={{width:"40Px", height:"40px", background:"#0f766e1a"}}>
                    
                    <i className="fa-solid fa-user-graduate text-primary"></i>
                </span>
                <span>My profile</span>
              </h3>
              <p className="text-muted">View and update your profile information.</p>
        </div>
         <p className="mt-3">Welcome {studentUser.full_name || "Guest"}</p>
       </div>
      </div>
    </div>
  )
}

export default StudentChangePassword
