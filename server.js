const express = require('express');
const app = express()
const port = 3000;
const bodyParser = require("body-parser");
var path = require('path');


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

const session = require("express-session");
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', [ start]);
app.get('/drop', [ DBCreation.DropUsersTable,DBCreation.DropTeachersTable]);
app.get('/create', [ DBCreation.CreateUsers, DBCreation.CreateTeachers]);
app.get('/show', [ DBCreation.ShowUsersTable,DBCreation.ShowTeachersTable]);
app.get('/insert', [ DBCreation.InsertDataToUsers, DBCreation.InsertDataToTeachers]);



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

app.get('/SearchTeachers', (req, res)=>{
  res.render('SearchTeachers');
});
app.get('/SearchTeachers', (req, res)=>{
  res.render('SearchTeachers');
});

app.get('/Signup', (req, res)=>{
  res.render('Signup');
});
 app.post('/SearchResults', CRUD.SearchResults);
 app.post('/Signup', CRUD.Signup);
 app.get('/edit', (req, res)=>{
  res.render('edit');
});
 app.post('/edit', CRUD.edit);


app.post("/Login", CRUD.Finduser);
app.get('/Login', (req, res)=>{
  res.render('Login');
});
app.post('/deleteUser', CRUD.deleteUser);
app.get('/deleteUser', (req, res)=>{
  res.render('Login');
});
