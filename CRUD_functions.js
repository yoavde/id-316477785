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
        }
        else
        console.log("User found");
        // res.send(results);
        res.render("Login");
        return;
    } )

}




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
module.exports = {Finduser,test};