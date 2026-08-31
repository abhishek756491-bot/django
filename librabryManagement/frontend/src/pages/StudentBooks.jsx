import axios from "axios"
import { toast } from "react-toastify"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"

const StudentBooks = () => {
    const [book, setBook] = useState([]);
    const [filtered,setFiltered]= useState([]);
    const [search,setSearch] =useState("");
    const [loading, setLoading] = useState(true);


    const Navigate = useNavigate()

    const studentUser = JSON.parse(localStorage.getItem("studentUser"));

    useEffect(() => {
      if(!studentUser){
        Navigate("/user/login");
        return;
      }
        const fetchbooks = async () =>{
          try{
            setLoading(true)
            const res = await axios.get("http://127.0.0.1:8000/api/user/books/");
            setBook(res.data);
            setFiltered(res.data);
          }catch(err){
            console.log(err);
            toast.error("Failed to fetch books")
          }
          finally{
            setLoading(false)
          }
        };
     fetchbooks();
      },[]
    )

    useEffect (() => {
        const term = search.trim().toLowerCase();
        if (!term) {
            setFiltered(book);
            return;
        }
        const filteredBooks = book.filter(book=>
            book.title.toLowerCase().includes(term) || 
            book.author_name.toLowerCase().includes(term) ||
            book.isbn.toLowerCase().includes(term)
        );
        setFiltered(filteredBooks);
    },[search,book])

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
                    
                    <i className="fa-solid fa-book text-primary"></i>
                </span>
                <span>Available books</span>
              </h3>
              <p className="text-muted">Explore all books in the library catalogue with quantity</p>


        </div>
         <div className="mt-3">
             <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="fa-solid fa-magnifying-glass text-muted"></i>
              </span>
              <input type="text" className="form-control border-start-0"
              placeholder="Search by title, author or ISBN"
              value={search} style={{width:"250px"}}
              onChange={(e) => setSearch(e.target.value)}></input>

             </div>
          </div>
       </div>

       {loading && (
        <div className="text-center my-5">
            <div className="spinner-boarder text-primary" role="status"></div>
              <span className="mt-3 text-muted">Loading...</span>
        </div>
       )}
       
       {!loading && filtered.length === 0 && (
        <div className="text-center my-5">
          <i className="fa-solid fa-book-open-reader fa-3x text-muted"></i>
          <p className="mt-3 text-muted">No books found.</p>
        </div>
       )}

       {!loading && filtered.length > 0 && (
        <div className="row g-d">
          {filtered.map((book) =>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 rounded-4">
              <div className="bg-light d-flex align-items-center justify-content-center rounded-2" style={{height:"200px"}}>
                <img src={`http://127.0.0.1:8000${book.cover_image}`} alt={Image.title} 
                style={{maxHeight:"180px", objectFit:"contain"}}/>
              </div>
              <div className="card-body d-flex flex-column">
                  <h6 className="mb-1 text-truncate">{book.title}</h6>
                  <p className="mb-1 text-muted small">
                    <i className="fa-solid fa-user-pen"></i> {book.author_name}</p>
                  
                  <p className="small mb-1">
                    <span className="badge text-primary border border-primary-subtle">
                      <i className="fa-solid fa-tag"></i>{book.category_name}
                    </span>
                  </p>
                  <p className="small mb-1 text-muted">
                     <i className="fa-solid fa-barcode"></i> ISBN : {book.isbn}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="fw-semibold text-success">
                     ₹ {book.price}
                    </span>

                    <span className={`badge px-3 py-2 rounded-pill
                    ${book.available_quantity > 0
                      ? 'bg-success-subtle text-success border border-success-subtle' 
                      : 'bg-danger-subtle text-danger border-danger-subtle'}`}>
                    {book.available_quantity > 0 ? `Available(${book.available_quantity})` : 'Not availabble'}</span>
                  </div>
              </div>
            </div>
          </div>
           )}
        </div>
       )}
      </div>
    </div>
  )
}

export default StudentBooks
