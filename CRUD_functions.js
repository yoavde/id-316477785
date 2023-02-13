const CRUD_operations = require("./CRUD_functions.js");
// app.post("/newCustomer", CRUD_operations.createNewCustomer)



const sql = require("./db.js");
var user_info;
let myValue;

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
   
    var User = req.body.email;
    var password=req.body.password;
    console.log(User);
    console.log(password);
    
    
    sql.query("SELECT * FROM teacherfinder.users where (username =? AND password =?)" , [User,password] , (err, results, req)=>{
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
            myValue = results;
            req.session = results
            console.log("User found");
            console.log(myValue)
            res.render("HomePage",{
                
                
          
            });
         
        }
        
        console.log(req.session)
        return;
    } )

}

const deleteUser = (req, res)=>{
    // console.log(res);
    if (!req.body) {
        res.status(400).send({message: "serch cannot be empty"});
        return;        
    }
 
    console.log(myValue);
    myValue=myValue[0].username;
   
    
    
    sql.query(`DELETE FROM teacherfinder.users WHERE username = "${myValue}"`) ,(err, results, fields)=>{
        if (err) {
            console.log("ERROR IS: " + err);
            res.status(400).send("Somthing is wrong with query" + err);
            return;
        }
       
            else{
                console.log(results);
                res.render("Login")
           
             
            }
        
     
        return 
    } 
    res.render("Login");
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
         
            res.render("SearchResults",{
                teachers_arr: results
            });
        }
     
        return;
    } )

}

const Signup = function (req, res) {
   
    var date = new Date();
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const NewUser = {
        "fullname": req.body.fullname,
        "password": req.body.password,
        "username":  req.body.username

       
    };
    sql.query("INSERT INTO teacherfinder.users SET ?", NewUser, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in creating user: " + err });
            return;
        }
         console.log("created user: ", { ...NewUser });
        res.render('HomePage', {
          
       });
       return;

    });
};

const edit = function (req, res) {
    myValue=myValue[0].username;
    var date = new Date();
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const NewUser = {
        "fullname": req.body.fullname,
        "password": req.body.password,
        // "username":  req.body.username

       
    };
    sql.query(`UPDATE teacherfinder.users SET fullname = "${req.body.fullname}", password = "${req.body.password}" WHERE  username = "${myValue}"`, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in creating user: " + err });
            return;
        }
         console.log("edit user: ", { ...NewUser });
        res.render('HomePage', {
          
       });
       return;

    });
};




const test = (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: "content can not be empty" });
        return;
    }


   const sqlq = "SELECT * FROM teacherfinder.teachers";
    console.log(sqlq);
    sql.query(sqlq, (err, mysqlres) => {
        if (err) {
            console.log("error is: " + err);
            res.status(400).send({ message: "error in finding tutor " + err });
            return;
        }
      
        console.log(mysqlres);
        res.render('Login', {
            pple: mysqlres
        });
        return;
    });
};




module.exports = {Finduser,test,SearchResults,Signup,deleteUser,edit};