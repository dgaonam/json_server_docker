import { useEffect,useState } from "react";
import axiosClient from "./config/AxiosClient";

import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [post, setPost] = useState({});
  const [paginas, setPaginas] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(2);

  const posts = () => {
    axiosClient.get('/posts?_start=0&_end=30')
      .then(res => {
        console.log(res.data.length);
        setPaginas((Math.ceil(res.data.length / recordsPerPage))-1);
        setPost(res.data);
      });
  };

  const siguientePagina = () => {
    if (currentPage <= paginas) {
      setCurrentPage(currentPage + 1)
      console.log(currentPage);
    }else{
      console.log("llegaste a la ultima pagina");
    }
  }
  const anteriorPagina = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      console.log(currentPage);
    }else{
      console.log("llegaste a la primer pagina");
    }
  }

  const pageNumbers = [...Array(paginas + 1).keys()].slice(1)
  
  useEffect(() => {
    posts();
  }, []);

  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Practica</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Posts</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Coments</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Profiles</a>
      </li>
    </ul>
    
  </div>
</nav>
<h1>Posts</h1>
<nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><a className="page-link" href="#" onClick={anteriorPagina}>Anterior</a></li>
          {pageNumbers.map((pagina) => (
            <li key={pagina} className="page-item"><a className="page-link" href="#" id={pagina} onClick={(event) => {
              setCurrentPage(event.currentTarget.id)
            }}>{pagina}</a></li>
          ))}
          <li className="page-item"><a className="page-link" href="#" onClick={siguientePagina}>Siguiente</a></li>
        </ul>
      </nav>
    <ul className="list-group list-group-numbered">
        {Object.keys(post).map((p) => (
          <li className="list-group-item" key={p} id={p} onClick={(e) => {
            console.log(p);
          }}>{post[p].title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
