import { useState,useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate,useParams } from "react-router-dom"

const IssuedBookDetails = () => {
    const {id} = useParams()
    const [issue,setIssue] = useState([]);
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
    },[id]);

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
            toast.error("Failed to load issued book details")
        }
        finally{
            setLoading(false)
        }
    }

    const handleReturn = async () =>{
      if(!window.confirm("Are you sure to return this book"))
        {return}

      if(!fine){
        toast.error("Please enter the fine ammount (enter 0 if no fine)")
      }
      setReturning(true);
      try{
        const res = await axios.post(`http://127.0.0.1:8000/api/admin/return-book/${id}/`,
          {fine : fine});
        toast.success("Book returned successfully")
          // navigate("/admin/manage-issued-books")
          fetchDetails();
      }
      catch(err) {
      console.error(err);
      toast.error("failed to return book")
      }
      finally{
      setReturning(false);
      }
    }

    const bookCoverUrl = issue && issue.book_cover ? 
(issue.book_cover.startsWith("http") ? issue.book_cover :
 `http://localhost:8000${issue.book_cover}`): null;

 if(loading || !issue){
// if(loading){
  return (
    <div className="py-5 d-flex justify-content-center align-items-center"
    style={{background:"linear-gradient(135deg,#f3f4ff,#fdfbff)",
      minHeight:"100vh"
    }}>
      <div className="spinner-border text-primary"></div>
    </div>
  )
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
                Issued Book Details
              </h3>

              <p className="text-muted small">
                view student and book details,return status and fine information
              </p>
              
            </div>
            <button className="btn btn-outline-primary btn-sm"
            onClick={()=>Navigate("/admin/manage-issued-books")}>Back to List</button>
          </div>
        </div>
          <div className="row g-p">
            <div className="col-md-6">
               <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h5 className="fw-semibold mb-3">Student Details</h5>
                  <hr />
                  <p className="mb-1">
                    <strong>Student Id : </strong>{issue.student_id}
                  </p>
                  <p className="mb-1">
                    <strong>Student Name : </strong>{issue.student_name}
                  </p>

                  <p className="mb-1">
                    <strong>Fine : </strong>{issue.fine ? `₹ {$issue.fine}` :"No fine recorded yet"}
                  </p>
                </div>
               </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h5 className="fw-semibold mb-3">Book Details</h5>
                  <hr />
                  {bookCoverUrl && (<img src={bookCoverUrl} alt={issue.book_title}
                  style={{width:"100px", 
                    height:"120px", 
                    objectFit:"cover",
                    borderRadius:"4px",
                    marginBottom:"12px"}}/>)}

                  <p className="mb-1">
                    <strong>Book Name : </strong>{issue.book_title}
                  </p>

                   <p className="mb-1">
                    <strong>ISBN : </strong>{issue.student_id}
                  </p>

                   <p className="mb-1">
                    <strong>Issued Date : </strong>{new Date(issue.issued_at).toLocaleDateString()}
                  </p>

                   <p className="mb-1">
                    <strong>Return Date : </strong>{
                      issue.returned_at ? new Date(issue.issued_at).toLocaleDateString() : "Not returned yet"
                    }
                  </p>
                </div>
              </div>   
               <div className="card border-0 shadow-sm rounded-4 mt-2">
                <div className="card-body p-4">
                  <h5 className="fw-semibold mb-3">Return Book</h5>
                  <hr />
                  {issue.is_returned ? (
                    <p className="text-success small mb-0">
                      This book has already been returned.
                      Fine : <strong>₹ {issue.fine || 0}</strong>
                    </p>
                  ) : (
                    <>
                    <div className="mb-3">
                      <label className="form-label small fw-medium">
                        Fine Amount (if any)
                      </label>
                      <input type="number"
                      className="form-control"
                      value={fine}
                      placeholder="Enter fine amount"
                      onChange={(e) => setFine(e.target.value)}>
                      </input>
                      </div>
                     <button className="btn btn-primary"
                     onClick={handleReturn}

                     disabled={returning}>

                      {returning ? (<>
                      <span className="spinner-border spinner-border-sm me-2">
                        processing...</span></>):<><i className="bi bi-check-circle-fill me-2"></i>Return Book</>}
                     </button>
                      </>
                     
                  )}
                </div>
               </div>
            </div>
          </div>
      </div>
    </div>
  )
}


export default IssuedBookDetails
