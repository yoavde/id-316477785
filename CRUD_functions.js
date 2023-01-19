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
    if (!req.body) {
        res.status(400).send({message: "serch cannot be empty"});
        return;        
    }
    // const User = req.query.SearchName;
    var User = req.body.uname;
    var password=req.body.psw;

   
    sql.query("SELECT * FROM users where (email =? AND pass =?)" , [User,password] , (err, results, fields)=>{
        if (err) {
            console.log("ERROR IS: " + err);
            res.status(400).send("Somthing is wrong with query" + err);
            return;
        }
        if(results.length ==0){
            res.status(400).render('success', {
                var1: 'http://localhost:3000/signin',
                var2: '/photos/cancel.png',
                var3:"Oops! The user does not exist. Check the email or password.",
                var4:'Go Back To login Page!'
           });
           return;
        }
        console.log("User found");
        // res.send(results);
        res.render("Search");
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