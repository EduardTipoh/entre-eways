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

    if (val.status == "pending") {
      content += `
      <tr>
      <td class="table-title">${val.firtName} ${val.lastName}</td>
      <td>${val.categories}</td>
      <td>${val.email}</td>
      <td>
        <button class="table-trash fa fa-trash" title="Delete" id="${val.techId}" onClick="deleteTech(this.id)">
        </button>
        <button
        class="table-edit fa fa-exclamation-circle" title="Edit" id="cat-edit">
        </button>
        <button
        class="table-view fa fa-eye" title="View" id="${val.username}" onClick="viewInfo(this.id)">
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
  }
}

function viewInfo(id) {
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
    var bio = snap.child("bio").val();
    var pImage = snap.child("profileImage").val();
    var status = snap.child("status").val();
    var username = snap.child("username").val();

    document.getElementById("techInform").innerHTML += `
            <img src="${pImage}" alt="" style="border-radius: 50%;"/>
            <h1 class="tech-name">${fName} ${lName}</h1>
            <h3>Title: ${title}</h3>
            <h3>Email: ${email}</h3>
            <h3>Shop: ${shop}</h3>
            <h3>Skills: ${skills}</h3>
            <p>Biography: ${bio}</p>
            <form class="btnForm">
              <button class="btnBack" onclick="btnBack()">
                <i class="fa fa-arrow-left"></i> Back
              </button>
              <button class="btnApprove" id="${username}" onclick="btnApprove(this.id)">
                Approve
                <i class="fa fa-check"></i>
              </button>
            </form>
      `;
  });
}

function btnApprove(id) {
  var stat = "verified";
  pass = myRef.child(id).push().key;
  newData = {
    status: stat,
    password: pass,
  };
  myRef.child(id).update(newData);

  techRefValue = firebase.database().ref("technicians").child(id);
  techRefValue.on("value", (snap) => {
    var fName = snap.child("firtName").val();
    var lName = snap.child("lastName").val();
    var email = snap.child("email").val();

    Email.send({
      Host: "smtp.yourisp.com",
      Username: "eways.entre@gmail.com",
      Password: "entrepc20",
      To: `${email}`,
      From: "eways.entre@gmail.com",
      Subject: "Validation of your account",
      Body: `Hello ${fName} ${lName}! We're glad to say that your account from Eways.com has been approved.
      You can now login to our website by using your username and use this password ${pass} as your password.
      You can update your password once you are logged in to our website.`,
    }).then((message) => alert(message));
  });

  document.querySelector(".view-modal").style.display = "none";
}

function btnBack(e) {
  e.preventDefault();
  document.querySelector(".view-modal").style.display = "none";
}
