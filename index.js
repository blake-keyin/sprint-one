const express = require('express')
const path = require('path')
const db = require('./queries');
 
const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extender: true }));
app.post('/', db.createUserUsingStack);

 
app.get('/', (request, response)=>{
 response.send("Bingo! we're live!");
})
 
app.listen(3000, ()=>{
 console.log("Server is running at http://localhost:3000/");
})