function signOutBtn() {
  localStorage.clear();
  document.querySelector(".signin-nav").style = "display: block";
  document.querySelector(".signout-nav").style = "display: none";
}

const myRef = firebase.database().ref("Users");

var regBtn = document.getElementById("register");

var uNameCheck = document.getElementById("name");
var emailCheck = document.getElementById("email");
var usernameCheck = document.getElementById("username");
var passwordCheck = document.getElementById("password");
var confirmPassCheck = document.getElementById("confirmPass");

// Register User
regBtn.addEventListener("click", (e) => {
  e.preventDefault();

  checkInput();
});

function checkInput() {
  var username = usernameCheck.value.trim();
  firebase
    .database()
    .ref("Users/" + username)
    .once("value", function (snapshot) {
      let userName = snapshot.child("username").val();

      // Get value
      var uName = uNameCheck.value;
      var email = emailCheck.value.trim();
      var username = usernameCheck.value.trim();
      var password = passwordCheck.value.trim();
      var confirmPass = confirmPassCheck.value.trim();

      if (uName === "") {
        setErrorFor(uNameCheck, "Name cannot be empty!");
      } else {
        setSuccessFor(uNameCheck);
      }
      if (email === "") {
        setErrorFor(emailCheck, "Email cannot be empty!");
      } else if (!isEmail(email)) {
        setErrorFor(emailCheck, "Please provide correct email");
      } else {
        setSuccessFor(emailCheck);
      }
      if (username === "") {
        setErrorFor(usernameCheck, "Username cannot be empty!");
      } else if (userName == username) {
        setErrorFor(usernameCheck, `Your Username ${userName} is taken`);
      } else {
        setSuccessFor(usernameCheck);
      }
      if (password === "") {
        setErrorFor(passwordCheck, "Password cannot be empty!");
      } else if (password != confirmPass) {
        setErrorFor(confirmPassCheck, "Password does not match");
        setErrorFor(passwordCheck, "Password does not match");
      } else {
        setSuccessFor(passwordCheck);
        setSuccessFor(confirmPassCheck);

        registerUserAccount(uName, email, username, password);
        window.location.href = "index.html";
      }
    });
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function registerUserAccount(uName, email, username, password) {
  // const autoId = myRef.push().key;
  var userName = document.getElementById("username").value;
  myRef.child(userName).set({
    // userId: autoId,
    name: uName,
    email: email,
    username: username,
    password: password,
  });
}

// Login User

document.getElementById("loginUser").addEventListener("submit", loginUser);

function loginUser(e) {
  e.preventDefault();
  let uUsername = document.getElementById("loginUsername").value;
  let uPass = document.getElementById("loginPass").value;

  login(uUsername, uPass);
}

function login(uUsername, uPass) {
  firebase
    .database()
    .ref("Users/" + uUsername)
    .once("value", function (snapshot) {
      let userName = snapshot.child("username").val();
      let userPassword = snapshot.child("password").val();

      if (userName != null) {
        if (userName == uUsername && userPassword == uPass) {
          localStorage.setItem("userName", uUsername);
          window.location.href = "index.html";
        } else {
          alert("Incorrect username or password");
        }
      } else {
        alert("Account does not exist");
      }
    });
}

if (localStorage.getItem("userName") != null) {
  document.querySelector(".signin-nav").style = "display: none";
  document.querySelector(".signout-nav").style = "display: block";
}

// SIGN IN MODAL
document.getElementById("signIn").addEventListener("click", function () {
  document.querySelector("#signin-modal").style.display = "flex";
});

document.getElementById("close-modal").addEventListener("click", function () {
  document.querySelector("#signin-modal").style.display = "none";
});

function createAccount() {
  document.querySelector("#signin-modal").style.display = "none";
  document.querySelector("#login-modal").style.display = "flex";
}

// LOG IN MODAL
document.getElementById("signUp").addEventListener("click", function () {
  document.querySelector("#login-modal").style.display = "flex";
});

document
  .getElementById("close-create-modal")
  .addEventListener("click", function () {
    document.querySelector("#login-modal").style.display = "none";
  });

// LOG IN AS TECHNICIAN MODAL
document.getElementById("loginAsTech").addEventListener("click", function () {
  document.querySelector("#loginTech-modal").style.display = "flex";
});

document
  .getElementById("close-loginTech-modal")
  .addEventListener("click", function () {
    document.querySelector(".login-modal").style.display = "none";
  });
