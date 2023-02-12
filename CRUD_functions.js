const CRUD_operations = require("./CRUD_functions.js");
// app.post("/newCustomer", CRUD_operations.createNewCustomer)



const sql = require("./db.js");
// const test = function (req, res) {
// sql.connect(function(err) {
//     if (err) throw err;
//     sql.query("SELECT * FROM teacherfinder.teachers", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//       return res;
//     });
//   });
// }

const Finduser = (req, res)=>{
    // console.log(res);
    if (!req.body) {
        res.status(400).send({message: "serch cannot be empty"});
        return;        
    }
    // const User = req.query.SearchName;
    var User = req.body.email;
    var password=req.body.password;
    console.log(User);
    console.log(password);
    
    
    sql.query("SELECT * FROM teacherfinder.users where (username =? AND password =?)" , [User,password] , (err, results, fields)=>{
        if (err) {
            console.log("ERROR IS: " + err);
            res.status(400).send("Somthing is wrong with query" + err);
            return;
        }
        console.log(results);
        if(results.length ==0){
            console.log("User not found");
            res.render("Login");
        }
        else{
            console.log("User found");
            // res.send(results);
            res.render("HomePage");
        }
     
        return;
    } )

}


const SearchResults = (req, res)=>{
    // console.log(res);
    if (!req.body) {
        res.status(400).send({message: "serch cannot be empty"});
        return;        
    }
    // const User = req.query.SearchName;
    var city = req.body.city;
    var price=req.body.price;
    var subject=req.body.subject;
    console.log(city);
    console.log(price);
    
   
    sql.query("SELECT * FROM teacherfinder.teachers where (city =? AND price <=? AND subject =?)" , [city,price,subject] , (err, results, subject)=>{
        if (err) {
            console.log("ERROR IS: " + err);
            res.status(400).send("Somthing is wrong with query" + err);
            return;
        }
        console.log(results);
        if(results.length ==0){
            console.log("teacher not found");
            res.render("SearchTeachers");
        }
        else{
            console.log("teacher found");
            // res.send(results);
            res.render("SearchResults",{
                teachers_arr: results
            });
        }
     
        return;
    } )

}

const Signup = function (req, res) {
    // Validate request
    var date = new Date();
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const NewUser = {
        "fullname": req.body.fullname,
        "password": req.body.Password,
        "username":   date.getMinutes()+date.getSeconds()+date.getMilliseconds()

       
    };
    sql.query("INSERT INTO teacherfinder.users SET ?", NewUser, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in creating user: " + err });
            return;
        }
         console.log("created user: ", { id: mysqlres.insertId, ...NewUser });
        res.render('HomePage', {
            var1:  'http://localhost:3000/signin',
            var2: '/photos/checked.png',
            var3:"New user created successfully!",
            var4:'Login with your user!'
       });
       return;

    });
};




const test = (req, res) => {
    // check if body is empty
    if (!req.body) {
        res.status(400).send({ message: "content can not be empty" });
        return;
    }
    //if body not empty - create new tutor
    // var tutorSub = req.query.subjects;
    // var tutorGr = req.query.Grade;
    // console.log(tutorSub, tutorGr);
    //insert query

   const sqlq = "SELECT * FROM teacherfinder.teachers";
    console.log(sqlq);
    sql.query(sqlq, (err, mysqlres) => {
        if (err) {
            console.log("error is: " + err);
            res.status(400).send({ message: "error in finding tutor " + err });
            return;
        }
        // if not query error
        console.log(mysqlres);
        res.render('Login', {
            pple: mysqlres
        });
        return;
    });
};




module.exports = {Finduser,test,SearchResults,Signup};