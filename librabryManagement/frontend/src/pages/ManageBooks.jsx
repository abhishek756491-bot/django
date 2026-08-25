import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const ManageBooks = () => {
    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [editId,setEditId] = useState(null)
    const [editTitle,setEditTitle] = useState("")
    const [editCategory, setEditCategory] = useState("")
    const [editAuthor, setEditAuthor] = useState("")
    const [editPrice, setEditPrice] = useState("")
    const [editQuantity, setEditQuantity] = useState("")
    const [authors, setAuthors  ] = useState([]);
    const [saving,setSaving] = useState(false)

    const [editImageFile,setEditImageFile] = useState(null)
    const [editImagePreview, setEditImagePreview] = useState(null)

    const [loadingList, setLoadingList] = useState(false)
    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() =>{
        if(!adminUser){
            navigate("/admin/login")
        }
        else{
            fetchAll
            ();
        }
    },[])

    const fetchAll = async () => {
      setLoadingList(true)
        try {
            const [booksRes,categoriesRes, authorsRes] = await Promise.all([
                axios.get("http://127.0.0.1:8000/api/books/"),
                axios.get("http://127.0.0.1:8000/api/categories/"),
                axios.get("http://127.0.0.1:8000/api/authors/"),
            ]);
            setBooks(booksRes.data);
            setCategories(categoriesRes.data)
            setAuthors(authorsRes.data);
        }
        catch (err) {
            console.error(err)
            toast.error("Failed to load data")
        }
        finally{
          setLoadingList(false)
        }
    }
    const StartEdit= (book) => {
        setEditId(book.id)
        setEditTitle(book.title);
        setEditCategory(book.category)
        setEditAuthor(book.author)
        setEditPrice(book.price)
        setEditQuantity(book.quantity)
        setEditImagePreview(`http://127.0.0.1:8000${book.cover_image}`);
        setEditImageFile(null)
    }

    const cancelEdit=() => {
      setEditId(null)
      setEditTitle("")
      setEditCategory("")
      setEditAuthor("")
      setEditPrice("")
      setEditQuantity("")
      setEditImageFile(null)
      setEditImagePreview(null)
    }

    const handleImageChange = (e) => {
      const file = e.target.files[0];
    if (file) {
      setEditImageFile(file);
      setEditImagePreview(URL.createObjectURL(file));
    }
  }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setSaving(true);

        try {
          const formData = new FormData();
          formData.append("title", editTitle);
          formData.append("category", editCategory);
          formData.append("author", editAuthor);
          formData.append("price", editPrice);
          formData.append("quantity", editQuantity);
          if (editImageFile) {
            formData.append("cover_image", editImageFile);
          }

            const res = await axios.put(`http://127.0.0.1:8000/api/update_book/${editId}/`,
                formData,
                {
                  headers: {"Content-Type": "multipart/form-data"},
                }
            );
            if (res.data.success) {
              toast.success(res.data.message || "Book updated")
              cancelEdit();
              fetchAll();
            }
            else{
              toast.error(res.data.message || "Update failed")
            }
        }
        catch (err){
            console.error(err)
            toast.error("Something went wrong")
        }
        finally{
            setSaving(false)
        }
    }
   const handleDelete = async (id)=>{
    const ok = window.confirm("Are you sure want to delete this book?");
    if(!ok) return;

    try {
      const res = await axios.delete(`http://127.0.0.1:8000/api/delete_book/${id}/`)

      if (res.data.success){
        toast.success(res.data.messege ||  "Book deleted")
        setBooks((prev) => prev.filter((b)=>b.id !== id))
        if (editId === id) {
          cancelEdit();
        }
      }
      else{
        toast.error(res.data.messege || "Delete failed")
      }
    }
     catch (err){
        console.error(err);
        toast.error("Something went wrong");
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
                <i className="fa-solid fa-book text-primary"></i>
                Manage Books
              </h3>

              <p className="text-muted small">
                View, edit, and delete Books from the library system.
              </p>
              
            </div>
            <button className="btn btn-outline-primary btn-sm"
            onClick={()=>navigate("/admin/book_add")}>Add New</button>
          </div>
        </div>
            <div className="row g-4">
                <div className="col-md-3">
                 <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                 <h6 className="fw-semibold mb-3">{editId ? "Edit Book" : "select a book to edit"}</h6>

                 {editId ? (
                  <form onSubmit={handleUpdate}>

                   <div className="row g-3">
                    <div className="col-md-12">
                    <label className="form-label small fw-medium">
                      Book Name
                    </label>
                      <input type="text" className="form-control"
                        placeholder="pyhon programming, javascript, etc."
                        required
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                      </div>

                      <div className="col-md-6">
                    <label className="form-label small fw-medium">
                      Category
                    </label>
                      <select className="form-select"
                        required
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}>
                            <option value=""> -- Select Category --</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                      </select>
                      </div>

                      <div className="col-md-6">
                    <label className="form-label small fw-medium">
                      Author
                    </label>
                      <select className="form-select"
                        required
                        value={editAuthor}
                        onChange={(e) => setEditAuthor(e.target.value)}>
                            <option value=""> -- Select Author --</option>
                            {authors.map((auth) => (
                                <option key={auth.id} value={auth.id}>{auth.name}</option>
                            ))}
                      </select>
                      </div>

                      
                      <div className="col-md-6">
                    <label className="form-label small fw-medium">
                      Price
                    </label>
                        <input type="number" className="form-control"
                        min="0" step="0.01"
                        placeholder="Enter price"
                        required
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                    <label className="form-label small fw-medium">
                      Quantity
                    </label>
                        <input type="number" className="form-control"
                        min="0"
                        step="1"
                        placeholder="e.g 50"
                        required
                        value={editQuantity}
                        onChange={(e) => setEditQuantity(e.target.value)}
                        />
                      </div>

                        <div className="col-md-10">
                    <label className="form-label small fw-medium">
                      Book Cover
                    </label>
                    {editImagePreview && (
                      <div className="mb-2">
                          <img src={editImagePreview} alt="Book Cover Preview"
                          className="img-fluid rounded"
                          style={{maxWidth:"100px", height:"70px"}}/>
                      </div>
                    )} 
                        <input type="file" className="form-control"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>

                  </div>

                  <div className="mt-2 d-flex align-items-center">
                      <button type="submit" className="btn btn-primary w-100 mt-2" disabled={saving}>
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating...</>) : (<>
                          <i className="fa-solid fa-plus"></i>
                        Update</>)}
                  </button>
                     <button className="btn btn-outline-danger ms-2 mt-2" onClick={cancelEdit} >
                       Cancel
                     </button>

                    </div>

                </form>
                 ) : (
                  <p className="text-muted small">
                    Click on the <strong>Edit</strong> button in the table to modify an author.
                  </p>
                 )}
                

              </div>
            </div>

                </div>
                <div className="col-md-9">
                  <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                      <h6 className="fw-semibold mb-3">Books Listing</h6>
                      
                      {loadingList ? (
                        <div className="text-center py-4">
                          <div className="spinner-border text-primary">

                          </div>
                        </div>
                      ) : books.length === 0 ? (
                        <p className="text-muted small">no books found. Try adding a new one.</p>
                      ):(
                       <div className="table-responsive">
                           <table className="table table-striped table-hover align-middle">
                             <thead className="small text-muted">
                              <tr>
                                <th>#</th>
                                <th>Book</th>
                                <th>Category</th>
                                <th>Author</th>
                                <th>ISBN</th>
                                <th>Price</th>
                                <th>QTY</th>
                                <th className="text-center text-nowrap">Action</th>
                              </tr>
                             </thead>
                              <tbody>
                              {books.map((book,index) => (
                               <tr key={book.id}>
                                  <td>{index+1}</td>
                                  <td style={{maxWidth:"200px"}}>
                                    <img src={`http://127.0.0.1:8000${book.cover_image}`} alt={book.title} 
                                    className="img-fluid rounded" 
                                    style={{maxWidth:"100px", height:"auto", marginBottom:"4px"}}/>
                                    <div className="fw-bold-small">
                                          {book.title}
                                    </div>
                                    </td>
                                   <td className="small text-muted">{book.category_name}</td>
                                   <td className="small text-muted">{book.author_name}</td>
                                   <td className="small text-muted">{book.isbn}</td>
                                   <td className="small text-muted">${book.price}</td>
                                   <td className="small text-muted">{book.quantity}</td>
                                   <td className="text-center">
                                    <button className="btn btn-sm btn-outline-primary me-2"
                                    onClick={()=>StartEdit(book)}>
                                      <i className="fa-solid fa-pen-to-square"/>Edit
                                    </button>
                                   
                                   <button className="btn btn-sm btn-outline-danger me-2"
                                   onClick={() => handleDelete(book.id)}>
                                      <i className="fa-solid fa-trash-can"/>Delete
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
      </div>
    </div>
  )
}

export default ManageBooks
