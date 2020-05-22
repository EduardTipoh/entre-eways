if (localStorage.getItem("username") == null) {
  window.location.replace("admin-login.html");
}

function logout() {
  window.location.replace("admin-login.html");
  localStorage.clear();
}
