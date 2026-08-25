import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const AddBook = () => {
    const [title,setTitle] = useState("");
    const [category,setCategory] = useState("");
    const [author,setAuthor] = useState("");
    const [isbn,setIsbn] = useState("");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");

    const [authors,setAuthors] = useState([]);
    const [categories,setCategories] = useState([]);

    const [coverfile,setCoverFile] = useState(null);

    const [loading, setLoading] = useState(false);
    const [loadingdropdown, setLoadingDropdown] = useState(false);

    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() =>{
        if(!adminUser){
            navigate("/admin/login")
        }
        else{
            fetchDropdownData();
        }
    },[])

    const fetchDropdownData = async () => {
        setLoadingDropdown(true);
        try {
            const [authsRes, catRes] = await Promise.all([
                axios.get("http://127.0.0.1:8000/api/authors/"),
                axios.get("http://127.0.0.1:8000/api/categories/")
            ]); 
           const activecategories = catRes.data.filter(cat => cat.is_active);
            setCategories(activecategories);
            setAuthors(authsRes.data);

        } catch (err) {
            console.error(err);
            toast.error("Failed to load authors or categories");
        } finally {
            setLoadingDropdown(false);
        }
    };

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

        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);  
        formData.append("author", author);
        formData.append("isbn", isbn);
        formData.append("price", price);
        formData.append("quantity", quantity);
        if (coverfile) {
            formData.append("cover_image", coverfile);
        }
        
        setLoading(true);

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/books/add/",
                formData,{
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            if (res.data.success) {
              toast.success(res.data.message || "Book added succesfully")
              setTitle("")
              setCategory("")
              setAuthor("")
              setIsbn("")
              setPrice("")
              setQuantity("")
              setCoverFile(null)
              fetchAuthors()
            }
            else{
              toast.error(res.data.message || "Failed to create book")
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
                <i className="fa-solid fa-book text-primary"></i>
                Add Book
              </h3>

              <p className="text-muted small">
                Create new book by filling the form below.
              </p>
            </div>
          </div>
        </div>

            <div className="row justify-content-center">
                <div className="col-md-10 ">
                 <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                 
                 {loadingdropdown ? (
                    <div className="text-center py-5">
                        <span className="spinner-border text-primary"></span>
                        </div>
                     )  : (
                <form onSubmit={handlesubmit}>

                  <div className="row g-3">
                    <div className="col-md-6">
                    <label className="form-label small fw-medium">
                      Book Name
                    </label>
                      <input type="text" className="form-control"
                        placeholder="pyhon programming, javascript, etc."
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      </div>

                      <div className="col-md-6">
                    <label className="form-label small fw-medium">
                      Category
                    </label>
                      <select className="form-select"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
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
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}>
                            <option value=""> -- Select Author --</option>
                            {authors.map((auth) => (
                                <option key={auth.id} value={auth.id}>{auth.name}</option>
                            ))}
                      </select>
                      </div>

                      <div className="col-md-6">
                    <label className="form-label small fw-medium">
                      ISBN No.
                    </label>
                        <input type="text" className="form-control"
                          placeholder="Enter ISBN number"
                          required
                          value={isbn}
                          onChange={(e) => setIsbn(e.target.value)}
                        />
                        <p className="text-muted small mb-0">ISBN must be unique for each book.</p>
                      </div>
                      
                      <div className="col-md-6">
                    <label className="form-label small fw-medium">
                      Price
                    </label>
                        <input type="number" className="form-control"
                        min="0" step="0.01"
                        placeholder="Enter price"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
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
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>

                        <div className="col-md-6">
                    <label className="form-label small fw-medium">
                      Book Cover
                    </label>
                        <input type="file" className="form-control"
                          accept="image/*"
                          required
                          onChange={(e) => setCoverFile(e.target.files[0])}
                        />
                      </div>

                  </div>
                  <div className="mt-4">
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Submitting...</>) : (<>
                          <i className="fa-solid fa-plus me-2"></i>
                        Add Book</>)}
                  </button>

                  </div>
                </form>
                     )}

              </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AddBook
