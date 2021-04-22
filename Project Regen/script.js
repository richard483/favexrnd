var usernameList = [];
var passwordList = [];
var dobList = [];

function registerPage(){

    var username = document.getElementById("re-username").value;
    var password = document.getElementById("re-password").value;
    var confPass = document.getElementById("re-conf-password").value;
    var dob = document.getElementById("re-dob").value;
    var alert = document.getElementById('registeralert'); 
    
    if (username.length < 3){
        alert.innerHTML = "Username too short.";
        return false;
    }
    else if (password.length < 5){
        alert.innerHTML = "Password too short";
        return false;
    }
    else if ( password != confPass ){
        alert.innerHTML = "Password doesn't match, please retype your Password.";
        return false;
    }
    else if(usernameList.indexOf(username) == -1){
        usernameList.push(username);
        passwordList.push(password);
        dobList.push(dob);

        alert.innerHTML = username + " is Successfully Registered. \nTry to login Now";

        document.getElementById("re-username").value ="";
        document.getElementById("re-password").value="";
        document.getElementById("re-conf-password").value="";
        document.getElementById("re-dob").value="";

        return true;
    }
    else{
        alert.innerHTML = username + " is already registered.";
        return false;
    }
}


function loginPage(){
    var username = document.getElementById("lgn-username").value;
    var password = document.getElementById("lgn-password").value;
    var alert = document.getElementById('loginalert');

    var i = usernameList.indexOf(username);

    if(usernameList.indexOf(username) == -1){
        alert.innerHTML = "Username does not exist.";
        return false;
    }
    else if(passwordList[i] != password){
        alert.innerHTML = "Password does not match.";
        return false;
    }
    else {
        alert.innerHTML = "Login Succesfully !";

        document.getElementById("lgn-username").value ="";
        document.getElementById("lgn-password").value="";
        window.location.href = "home.html";
        return true;
    }

}


var button = document.getElementsByClassName("menu-item");

var addSelectedClass = function(){
    removeSelectedClass();
    this.classList.add('selected');
}

var removeSelectedClass = function(){
    for (var i = 0; i < button.length; i++) {
        button[i].classList.remove('selected')
    }
}

for (var i = 0; i < button.length; i++) {
    button[i].addEventListener("click",addSelectedClass);
}

var login = document.getElementById("login");
var register = document.getElementById("register");

function loginTab(){
    login.style.display = "block";
    register.style.display = "none";
}

function regisTab(){
    login.style.display = "none";
    register.style.display = "block";
}