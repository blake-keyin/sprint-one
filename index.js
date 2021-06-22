/*    Semester 3 - Sprint one
        Spy Message Databases
    Written By: Blake Legge, Brady Peters
*/

const express = require('express')
const path = require('path')
const db = require('./queries');
 
const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.json("server is live");
});

app.post('/stack/messages', db.createMessageUsingStack);
app.get('/stack/messages', db.getMessageUsingStack);

app.post('/queue/messages', db.createMessageUsingQueue);
app.get('/queue/messages', db.getMessageUsingQueue);

app.get('/all/messages', db.getAll);


app.listen(3000, ()=>{
 console.log("Server is running at http://localhost:3000/");
})