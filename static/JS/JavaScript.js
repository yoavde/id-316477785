// -----Validation Functions-----

function validateSignup() {
    let password = document.forms["signup"]["Password"].value;
    let name = document.forms["signup"]["Full Name"].value;

    if ( password.length < 8){
        alert("Please enter password with minimum 8 chars")
        return false;
    }

    else if ( name.length < 3){
        alert("Name is too short")
        return false;
    }

    else if ( name.length > 30){
        alert("Name is too long")
        return false;
    }

   return true;
}


function validateCreateTeacher() {

    let price = document.forms["createTeacher"]["price per hour"].value;


    if ( price > 200){
        alert("Please enter price under 200₪")
        return false;
    }

   return true;
}

function validateLogin() {
    let password = document.forms["login"]["password"].value;

    if ( password.length < 8){
        alert("Please enter password with minimum 8 chars")
        return false;
    }

   return true;
}


// -----Show Password Function-----

function ShowPassfunction() {
    var show = document.getElementById('password')
    if (show.type === 'password') {
        show.type = 'text';
    } else {
        show.type = 'password';
    }
}


// -----Check Passwords Function-----

let Check = function() {
  if (document.getElementById('Password').value ===
    document.getElementById('Re-type Password').value) {
    document.getElementById('message').style.fontFamily = 'Arial';
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').style.fontWeight ="1000";
    document.getElementById('message').innerHTML = 'Matching!';
  } else {
    document.getElementById('message').style.fontFamily = 'Arial';
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').style.fontWeight ="1000";
    document.getElementById('message').innerHTML = 'Not Matching!';
  }
}

// var d = new Date();
// console.log(d);
// var currentPage = window.location.pathname;
// console.log(currentPage);
//
// const activePage = document.querySelectorAll("nav a").forEach(
//     link =>{
//         if (link.href.includes(`${currentPage}`)) {
//             link.classList.add("active");
//         }
//     }
// );
// console.log(activePage);
// function test(){
//     fetch('http://localhost:3001/', {
//   method: 'Get',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     key: 'value'
//   })
  
// })
//   .then(response => response.json(data))
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

// }