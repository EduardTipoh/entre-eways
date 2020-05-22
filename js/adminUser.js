if (localStorage.getItem("username") == null) {
  window.location.replace("admin-login.html");
}

function logout() {
  window.location.replace("admin-login.html");
  localStorage.clear();
}

const myRef = firebase.database().ref("Users");

myRef.on("value", function (snapshot) {
  var content = "";
  snapshot.forEach(function (child) {
    var val = child.val();

    content += `
    <tr>
    <td class="table-title">${val.name}</td>
    <td>${val.username}</td>
    <td>${val.email}</td>
    <td>
      <button class="table-trash fa fa-trash" title="Delete" id="${val.username}" onClick="userDelete(this.id)">
      </button>
    </td>
    </tr>`;
    document.getElementById("table-body").innerHTML = content;
  });
});

function userDelete(deleteUser) {
  var newStr = deleteUser.substring(0, deleteUser.length);
  var r = confirm("Are you sure you want to delete?");
  if (r == true) {
    firebase.database().ref("Users/").child(newStr).remove();
    alert(newStr + " Successfully Deleted!");
  }
}

function searchUser() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("userSearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("user-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
