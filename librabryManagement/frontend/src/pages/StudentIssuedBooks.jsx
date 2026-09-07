import { useState,useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const StudentIssuedBooks = () => {
    const [loading,setLoading] = useState(true)
    const [issuedBooks,setIssuedBooks] = useState([])
   
    const navigate = useNavigate()

    const studentUser = JSON.parse(localStorage.getItem("studentUser"))

    useEffect(()=> {
        if(!studentUser){
            navigate("/user/login")
            return;
        }
        const fetchIssuedBooks = async () => {
            try{
                setLoading(true)
                const res = await axios.get("http://127.0.0.1:8000/api/user_issued_books",{
                    params: {student_id: studentUser.student_id}
                });
                setIssuedBooks(res.data);
            }catch(err){
                console.error(err)
                toast.error("Failed to fetch issued books")
            }finally{
                setLoading(false)
            }
        }
        fetchIssuedBooks()
    },[])

    const totalIssued = issuedBooks.length;
    const noReturnedCount = issuedBooks.filter(issue => !issue.is_returned).length;
    const totalFine = issuedBooks.reduce((sum,issue)=> sum + (issue.fine || 0),0);

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
                    
                    <i className="fa-solid fa-receipt text-primary"></i>
                </span>
                <span>My Issued book</span>
              </h3>

        </div>
        <p className="mt-3">Welcome {studentUser.full_name || "Guest"}</p>
          </div>

          {loading && (
            <div className="text-center py-5">
             <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
             </div>
          )}

          {!loading && (
            <div className="row g-3 mb-4">
                <div className="col-md-4 mb-3">
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <p className='text-muted text-uppercase small mb-1'>Total issued book</p>
                            <h4 className="mb-0">{totalIssued}</h4>
                        </div>
                        <span className="d-inline-flex align-items-center justify-content-center rounded-3"
                        style={{width:"40px",height: "40px", background:"#0f766e1a"}}>
                            <i className="fa-solid fa-book-open text-primary"></i>
                        </span>
                    </div>
                </div>
            </div>

             <div className="col-md-4 mb-3">
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <p className='text-muted text-uppercase small mb-1'>Not Returned</p>
                            <h4 className="mb-0">{noReturnedCount}</h4>
                        </div>
                        <span className="d-inline-flex align-items-center justify-content-center rounded-3"
                        style={{width:"40px",height: "40px", background:"#0f766e1a"}}>
                            <i className="fa-solid fa-book-open text-primary"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <p className='text-muted text-uppercase small mb-1'>Total Fine</p>
                            <h4 className="mb-0">{totalFine}</h4>
                        </div>
                        <span className="d-inline-flex align-items-center justify-content-center rounded-3"
                        style={{width:"40px", height: "40px", background:"#0f766e1a"}}>
                            <i className="fa-solid fa-indian-rupee-sign text-primary"></i>
                        </span>
                    </div>
                </div>
            </div>
            
            </div>
          )}
          {!loading && issuedBooks.length === 0 && (
            <div className="text-center py-3">
                <div className="alert alert-info">
                    <i className="fa-solid sa-info-circle me-2"></i>
                    No issued books found
                </div>
            </div>
          )}           
          
         {!loading && issuedBooks.length > 0 && (
            <div className="table-responsive border rounded-3">
                <table className="table table-hower mb-0">
                    <thead>
                        <tr>
                            <th>s.no</th>
                            <th>Book TItle</th>
                            <th>ISBN</th>
                            <th>Issue Date</th>
                            <th>Return Date</th>
                            <th>File (₹)</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issuedBooks.map((issue,index) =>{
                        return <tr key={index.id}>
                             <td>{index + 1}</td>
                             <td>{issue.book_title}</td>
                             <td>{issue.book_isbn}</td>
                             <td>{new Date(issue.issued_at).toLocaleString()}</td>
                             <td> {issue.returned_at ? new Date(issue.returned_at).toLocaleDateString(): 
                             <span className="text-warning fe-bold">Not returned yet</span>}</td>
                             <td>{issue.fine || 0}</td>
                             <td className={issue.is_returned ? 'text-success' : 'text-warning'}>
                                {issue.is_returned ? 'returned' : 'Not returned'}
                             </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
         )} 
      </div>
    </div>
  )
}

export default StudentIssuedBooks
