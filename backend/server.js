const  { initializeApp } = require("firebase/app");
const { getDatabase,ref,get,child } = require("firebase/database");
const jsonServer = require('json-server');
const server = jsonServer.create()
//const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const fs = require('fs');

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



async function db(){
  let json = "{";
  const dbRef = ref(getDatabase());
  const posts =await get(child(dbRef, "posts" )).then((posts)=>{
    return posts.val();
  })
  console.log("Resultado",posts);

  json +="\"posts\":["
  posts.forEach(post => {
    json +=JSON.stringify(post)+","
  });
  json=json.substring(0, json.length-1)
  json+="],\"comments\":["

  const comments =await get(child(dbRef, "comments" )).then((comments)=>{
    return comments.val();
  })
  console.log("Resultado",comments);
  comments.forEach(comment => {
    json +=JSON.stringify(comment)+","
  });
  json=json.substring(0, json.length-1)
  json+="],\"profile\":["
  const profiles =await get(child(dbRef, "profile" )).then((profiles)=>{
    return profiles.val();
  })
  console.log("Resultado",profiles);
  profiles.forEach(profile => {
    json +=JSON.stringify(profile)+","
  });
  json=json.substring(0, json.length-1)
  json+="]}"
  console.log(json);
  const filename = 'db.json';
  fs.writeFileSync(filename, json)
  server.use(jsonServer.router('db.json'))
}
server.use(middlewares)

server.listen(port, () => {
  db();
  
  console.log('JSON Server is running',process.env.REACT_APP_PORT)

})
