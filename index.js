const express = require("express");
const server = express();
const morgan=require('morgan')
const body_parser = require("body-parser");

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = process.env.PORT || 9000;

// << db setup >>
const db = require("./db");
const { request, response } = require("express");
const dbName = "curso";
const collectionName = "cursos";


db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
   server.get("/ListCourse", (request, response) => {
      // return updated list
      dbCollection.find().toArray((error, result) => {
         if (error) throw error;
         response.json(result);
      });
   });
   
   server.get ("/",(request,response)=>{
      response.send("hello world ")
   })
}, function (err) { 
   throw (err);
});

server.listen(port, () => {
   console.log(`Server listening at ${port}`);
});
