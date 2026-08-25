import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const AddAuthor = () => {
    const [name,setName] = useState("");
    const [authors,setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() =>{
        if(!adminUser){
            navigate("/admin/login")
        }
        else{
            fetchAuthors();
        }
    },[])

    const fetchAuthors = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/authors/");
            setAuthors(res.data);
        }
        catch (err) {
            console.error(err)
            toast.error("Failed to load authors")
        }
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        setLoading(true);

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/authors/add/",
                {name}
            );
            if (res.data.success) {
              toast.success(res.data.message || "Author created")
              setName("")
              fetchAuthors()
            }
            else{
              toast.error(res.data.message || "Failed to create author")
            }
        }
        catch (err){
            console.error(err)
            toast.error("Something went wrong")
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
                Add Author
              </h3>

              <p className="text-muted small">
                Create new authors and manage their information
              </p>
            </div>
          </div>
        </div>

            <div className="row g-4">
                <div className="col-md-5">
                 <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">

                <form onSubmit={handlesubmit}>

                  <div className="mb-3">
                    <label className="form-label small fw-medium">
                      Author Name
                    </label>
                      <input type="text" className="form-control"
                        placeholder="e.g John Doe, Jane Smith"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      </div>
                  

                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Adding...</>) : (<>
                          <i className="fa-solid fa-plus me-2"></i>
                        Add Author</>)}
                  </button>

                </form>

              </div>
            </div>
                </div>
                <div className="col-md-7">
                  <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                      <h6 className="fw-semibold mb-3">Existing Authors</h6>

                      {authors.length === 0 ? (
                        <p className="text-muted small">no authors found. Add your first author form.</p>
                      ) : 
                      (
                       <div className="table-responsive">
                           <table className="table">
                             <thead>
                              <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Created</th>
                              </tr>
                             </thead>
                              <tbody>
                              {authors.map((author,index) => (
                               <tr key={author.id}>
                                  <td>{index+1}</td>
                                  <td>{author.name}</td>
                                   <td>{new Date (author.created_at).toLocaleDateString()}</td>
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
      </div>
    </div>
  )
}

export default AddAuthor
