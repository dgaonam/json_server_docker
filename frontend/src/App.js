import { useEffect, useState } from "react";
import axiosClient from "./config/AxiosClient";

import "bootstrap/dist/css/bootstrap.min.css"

function App() {

  const posts = () => {
    axiosClient.get('/posts')
      .then(res => {
        console.log(res);
      });
  };
  
  useEffect(() => {
  
    posts();
  }, []);

  return (
    <>
    <h1>Prueba</h1>

    </>
  );
}

export default App;
