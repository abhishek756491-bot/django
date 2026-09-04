import { useState,useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate,useParams } from "react-router-dom"

const IssuedBookDetails = () => {
    const {id} = useParams()
    const [issue,setIssue] = useState(null);
    const [fine,setFine] = useState("")
    const [returning,setReturning] = useState(false)
    const [loading,setLoading] = useState(false)

    const Navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");


    useEffect(() => {
        if(!adminUser){
            Navigate("/admin/login");
        }
        fetchDetails()
    },[]);

    const fetchDetails = async () => {
        setLoading(true);
        try{
            const res = await axios.get(`http://127.0.0.1:8000/api/admin/issued-books/${id}/`);
            setIssue(res.data)
            if(res.data.fine){
                setFine(res.data.fine);
            }
        }
        catch (err) {
            console.error(err);
            toast.error("Fialed to load issued book")
        }
        finally{
            setLoading(false)
        }
    }

    const 
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
                Manage Issued Books
              </h3>

              <p className="text-muted small">
                view all issued books, their status and return details.
              </p>
              
            </div>
            <button className="btn btn-outline-primary btn-sm"
            onClick={()=>navigate("/admin/issue_book")}>Issued New Book</button>
          </div>
        </div>
                  <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                      <h6 className="fw-semibold mb-3">Students Listing</h6>
                      
                      {loading ? (
                        <div className="text-center py-4">
                          <div className="spinner-border text-primary">

                          </div>
                        </div>
                      ) : issues.length === 0 ? (
                        <p className="text-muted small">No issued books found</p>
                      ):(
                       <div className="table-responsive">
                           <table className="table table-striped table-hover">
                             <thead className="small text-muted">
                              <tr>
                                <th>s.no</th>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Book name</th>
                                <th>ISBN</th>
                                <th>Issue Date</th>
                                <th>Return Date</th>
                                <th className="text-center">Action</th>
                              </tr>
                             </thead>
                              <tbody>
                              {issues.map((issue,index) => (
                               <tr key={issue.id}>
                                  <td>{index+1}</td>
                                  <td>{issue.student_id}</td>
                                  <td>{issue.student_name}</td>
                                  <td>{issue.book_title}</td>
                                  <td>{issue.book_isbn}</td>
                                  <td>{new Date(issue.issued_at).toLocaleDateString()}</td>
                                  <td>{issue.is_returned ? (new Date(issue.returned_at).toLocaleDateString()):(
                                    <span className="badge bg-danger">Not returned</span>
                                  )}</td>
                                
                                <td className="text-center">
                                    <button className="btn btn-sm btn-outline-primary"
                                    onClick={()=>navigate(`/admin/issued-books/${issue.id}`)}>
                                        <i className="fa-solid fa-pen-to-square me-1"></i>Detailed/Return</button>
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


export default IssuedBookDetails
