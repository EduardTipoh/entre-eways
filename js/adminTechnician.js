if (localStorage.getItem("username") == null) {
  window.location.replace("admin-login.html");
}

function logout() {
  window.location.replace("admin-login.html");
  localStorage.clear();
}
var myRef = firebase.database().ref("technicians");
const readRef = firebase.database().ref().child("technicians");

myRef.on("value", (snap) => {
  var content = "";
  snap.forEach(function (child) {
    var val = child.val();

    if (val.status == "verified") {
      content += `
      <tr>
      <td class="table-title">${val.firtName} ${val.lastName}</td>
      <td>${val.categories}</td>
      <td>${val.email}</td>
      <td>
        <button class="table-trash fa fa-trash" title="Delete" id="${val.username}" onClick="deleteTech(this.id)">
        </button>
        <button
        class="table-edit fa fa-exclamation-circle" title="Edit">
        </button>
        <button
        class="table-view fa fa-eye" title="View" id="${val.username}" onclick="viewTech(this.id)">
        </button>
      </td>
      </tr>`;
      document.getElementById("table-body").innerHTML = content;
    }
  });
});

function deleteTech(id) {
  var newStr = id.substring(0, id.length);
  var r = confirm("Are you sure you want to delete?");
  if (r == true) {
    firebase.database().ref("technicians/").child(newStr).remove();
    alert("Technician Record Successfully Deleted");
    window.location.href = "admin-technician.html";
  }
}

function viewTech(id) {
  document.querySelector(".view-modal").style.display = "flex";
  var viewTechRef = firebase.database().ref("technicians").child(id);

  viewTechRef.on("value", (snap) => {
    var content = "";
    var fName = snap.child("firtName").val();
    var lName = snap.child("lastName").val();
    var title = snap.child("title").val();
    var email = snap.child("email").val();
    var shop = snap.child("shop").val();
    var skills = snap.child("skills").val();
    var price = snap.child("price").val();
    var bio = snap.child("bio").val();
    var pImage = snap.child("profileImage").val();
    var status = snap.child("status").val();
    var username = snap.child("username").val();

    document.getElementById("techInform").innerHTML += `
      <img src="${pImage}" alt="" />
            <h1 class="tech-name">${fName} ${lName}</h1>
            <h3>Title: ${title}</h3>
            <h3>Email: ${email}</h3>
            <h3>Shop: ${shop}</h3>
            <h3>Skills: ${skills}</h3>
            <p>Price: ${price} PHP</p>
            <p>Biography: ${bio}</p>
            <form class="btnForm">
              <button class="btnBack" onclick="btnBack()">
                <i class="fa fa-arrow-left"></i> Back
              </button>
            </form>
      `;
  });
}
