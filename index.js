const express = require('express')
const path = require('path')

const app = express();

app.get('/', (request, response)=>{
    response.send("Test Message");
})

app.listen(3000, ()=>{
    console.log("Server is running at http://localhost:3000/");
})

 