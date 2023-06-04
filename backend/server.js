const  { initializeApp } = require("firebase/app");
const { getDatabase,ref,get,child } = require("firebase/database");
const jsonServer = require('json-server');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

require("dotenv").config();
const port = `${process.env.REACT_APP_PORT}`;

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
}

const app = initializeApp(firebaseConfig);

function posts(){
  const dbRef = ref(getDatabase());
  const resultado =get(child(dbRef, "posts" )).then((posts)=>{
    return posts.val();
  })
  console.log("Resultado",resultado);

}
server.use(middlewares)
server.use(router)
server.listen(port, () => {
  posts();
  console.log('JSON Server is running',process.env.REACT_APP_PORT)
})
