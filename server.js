const express = require('express');
const app = express()
const port = 3001;
const bodyParser = require("body-parser");
var path = require('path');
// import modules

const sql = require("./db");
const CRUD= require('./CRUD_functions.js');
 const DBCreation = require('./Dbcreate.js');
const fs = require('fs');
  //  const stringify = require('csv-stringify').stringify;
  //  const { parse } = require("csv-parse");
// const CSVToJSON = require('csvtojson');
const start =function(req,res){
    res.render('Login');
}

app.engine('pug', require('pug').__express)
app.use(bodyParser.json());// parse requests of contenttype: application/json
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('static'));//set up for static dir
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); 
// const dbConfig = require(db.config.js);
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.get('/', [ DBCreation.CreateUsers, DBCreation.CreateTeachers,start]);



// app.get('/test', (req, res) => {
//   res.send('dfdfdfdf')
// })
app.get("/test", CRUD.test);
app.get('/test', (req, res)=>{
  res.render('Login');
});
app.get('/HomePage', (req, res)=>{
  res.render('HomePage');
});
app.post('/HomePage', (req, res)=>{
  res.render('HomePage');
});
app.get('/MyTeachers', (req, res)=>{
  res.render('MyTeachers');
});
// app.post('/MyTeachers', (req, res)=>{
//   res.render('MyTeachers');
// });
app.get('/SearchTeachers', (req, res)=>{
  res.render('SearchTeachers');
});
app.get('/SearchTeachers', (req, res)=>{
  res.render('SearchTeachers');
});
// app.post('/SearchTeachers', CRUD.SearchResults);
app.get('/Signup', (req, res)=>{
  res.render('Signup');
});
 app.post('/SearchResults', CRUD.SearchResults);
 app.post('/Signup', CRUD.Signup);





app.post("/Login", CRUD.Finduser);
app.get('/Login', (req, res)=>{
  res.render('Login');
});
// app.get('/user_data', (req, res)=>{
//   // console.log(res.email);
//   res.render('Finduser');
// });
//  app.get('/Search', (req, res)=>{
//    res.render('Search'); });
    // app.post('/Search', CRUD.Finduser);
    // app.post('/test', CRUD.test);
    
    
  //  app.post("/test", CRUD.test);
// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// })
// app.post('/test',CRUD.test);
//   const mysql = require("mysql2");

// const dbConfig = require(“db.config.js");
// Create a connection to the database
// const connection = mysql.createConnection({
// host: 'localhost',
// user: 'root',
// password: '6hsr5swd',
// database: 'teacherfinder'
// });
// open the MySQL connection
// connection.connect(function(err) {
//   if (err) throw err;
//   connection.query("SELECT * FROM teachers", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });