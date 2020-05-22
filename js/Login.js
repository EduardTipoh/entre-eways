document.getElementById("formLogin").addEventListener("submit", loginAdmin);

function loginAdmin(e) {
  e.preventDefault();
  let userName = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  login(userName, password);
}

function login(userName, password) {
  firebase
    .database()
    .ref("Admin/" + userName)
    .once("value", function (snapshot) {
      let adminUsername = snapshot.child("username").val();
      let adminPassword = snapshot.child("password").val();
      if (adminUsername != null) {
        if (adminUsername == userName && adminPassword == password) {
          localStorage.setItem("username", userName);
          window.location.href = "admin-dashboard.html";
        } else {
          alert("Incorrect username or password");
        }
      } else {
        alert("Account does not exist");
      }
    });
}

if (localStorage.getItem("username") != null) {
  window.location.replace("admin-dashboard.html");
}
