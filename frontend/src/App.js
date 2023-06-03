import { useEffect,useState } from "react";
import axiosClient from "./config/AxiosClient";

import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [post, setPost] = useState({});
  const posts = () => {
    axiosClient.get('/posts?_start=0&_end=30')
      .then(res => {
        console.log(res.data);
        setPost(res.data);
      });
  };
  
  useEffect(() => {
    posts();
  }, []);

  return (
    <>
    <h1>Prueba</h1>
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
