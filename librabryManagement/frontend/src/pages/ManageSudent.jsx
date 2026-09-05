import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  
  const navigate = useNavigate();
  const adminUser = localStorage.getItem("adminUser");

  useEffect(() =>{
      if(!adminUser){
          navigate("/admin/login")
      }
      else{
          fetchStudents();
      }
  },[])

  const fetchStudents = async () => {
    setLoadingList(true)
      try {
          const res = await axios.get("http://127.0.0.1:8000/api/admin/students/");
          setStudents(res.data);
      }
      catch (err) {
          console.error(err)
          toast.error("Failed to load students")
      }
      finally{
        setLoadingList(false)
      }
  }
  
  const handleToggleStatus = async (student) => {
    const isCurrentlyActive = student.is_active;
    const url = isCurrentlyActive ? 
    `http://127.0.0.1:8000/api/admin/students/block/${student.id}/` :
    `http://127.0.0.1:8000/api/admin/students/unblock/${student.id}/`;

    const confirmMessage = isCurrentlyActive ?
      `Are you sure you want to block ${student.full_name}?` :
      `Are you sure you want to unblock ${student.full_name}?`;

    if (!window.confirm(confirmMessage)) {
      return;
    } 

    try {
      await axios.put(url);
      fetchStudents(); 
      toast.success("Student status updated successfully");

    }catch (err) {
      console.error(err);
      toast.error("Failed to update student status");
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
        <div className="row mb-4">
          <div className="col-md-8 mx-auto d-flex justify-content-between align-items-center">
            <div className="mb-4 text-center">
              <h3 className="fw-semibold mb-1">
                <i className="fa-solid fa-layer-group text-primary"></i>
                Manage Students
              </h3>

              <p className="text-muted small">
                view all registered students, block or unblock a students.
              </p>
              
            </div>
            <button className="btn btn-outline-primary btn-sm"
            onClick={()=>navigate("/admin/category_add")}>Issued Book</button>
          </div>
        </div>
                  <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                      <h6 className="fw-semibold mb-3">Students Listing</h6>
                      
                      {loadingList ? (
                        <div className="text-center py-4">
                          <div className="spinner-border text-primary">

                          </div>
                        </div>
                      ) : students.length === 0 ? (
                        <p className="text-muted small">No registered students found</p>
                      ):(
                       <div className="table-responsive">
                           <table className="table table-striped table-hover">
                             <thead className="small text-muted">
                              <tr>
                                <th>s.no</th>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Reg Date</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                              </tr>
                             </thead>
                              <tbody>
                              {students.map((student,index) => (
                               <tr key={student.id}>
                                  <td>{index+1}</td>
                                  <td>{student.student_id}</td>
                                  <td>{student.full_name}</td>
                                  <td>{student.email}</td>
                                  <td>{student.mobile}</td>
                                  <td>{new Date(student.created_at).toLocaleDateString()}</td>
                                  <td>{student.is_active ? 
                                  (<span className="badge bg-success-subtle text-success border-success-subtle">Active</span>)
                                   :
                                   (<span className="badge bg-secondary-subtle text-secondary border-secondary-subtle">Inactive</span>)}</td>
                                   <td className="text-center d-flex">
                                  <button className={student.is_active ? "btn btn-sm btn-outline-danger m-2" : "btn btn-sm btn-outline-success m-2"}
                                   onClick={()=>handleToggleStatus(student)}>
                                    {student.is_active ? "Block" : "Unblock"}
                                  </button>
                                      
                                  <button className="btn btn-sm btn-success h-2"
                                    onClick={()=>navigate(`/admin/students/history/${student.student_id}`)}>
                                    Details
                                  </button>
                                  

                                   </td>
                               </tr>
                              ))}
                                
                              </tbody>
                           </table>
                       </div>
                      )}      
              </div>
          </div>
      </div>
    </div>
  )
}


export default ManageStudents;
