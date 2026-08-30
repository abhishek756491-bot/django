import axios from "axios"
import { toast } from "react-toastify"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"

const StudentProfile = () => {
     const [book, setBook] = useState([]);
    const [filtered,setFiltered]= useState([]);
    const [search,setSearch] =useState("");
    const [loading, setLoading] = useState(true);


    const Navigate = useNavigate()

    const studentUser = JSON.parse(localStorage.getItem("studentUser"));

    useEffect(() => {
      if(!studentUser){
        Navigate("user/login");
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
            book.author.toLowerCase().includes(term) ||
            book.isbn.toLowerCase().includes(term)
        );
        setFiltered(filteredBooks);
    },[search,book])
  return (
    <div>
      div
      className="py-5"
      style={{
        background: "linear-gradient(135deg,#f3f4ff,#fdfbff)",
        minHeight: "100vh"
      }}
    
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
       </div>
    </div>
  )
}

export default StudentProfile
