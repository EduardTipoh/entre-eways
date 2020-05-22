const techRef = firebase.database().ref("technicians");

var fName = document.getElementById("firstname");
var lName = document.getElementById("lastname");
var shop = document.getElementById("shop");
var email = document.getElementById("techEmail");
var skills = document.getElementById("skills");
var chekYes = document.getElementById("checkYes");
var bio = document.getElementById("bio");
var title = document.getElementById("title");
var categories = document.getElementById("category");
var status = "pending";
var regBtn = document.getElementById("techRegister");

regBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // VALIDATION
  if (localStorage.getItem("userName") == null) {
    alert("You must sign in as User first!");
  } else {
    if (
      fName.value == "" ||
      lName.value == "" ||
      shop.value == "" ||
      email.value == "" ||
      bio.value == "" ||
      skills.value == "" ||
      title.value == "" ||
      categories.value == ""
    ) {
      alert("Please fill up all the fields.");
      fName.focus();
    } else {
      registerAccount();
      // clearInputs();
      // alert("Please wait for the confirmation of the admin.");
      // window.location.href = "index.html";
    }
  }
});

function registerAccount() {
  const imgCover = document.getElementById("profileImage").files[0];
  const imageName = imgCover.name;
  const storageRef = firebase.storage().ref("/technicians/" + imageName);
  const uploadTask = storageRef.put(imgCover);
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    function (error) {},
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        const id = localStorage.getItem("userName");

        if (chekYes.checked == true) {
          var isCheck = "yes";
        } else {
          var isCheck = "no";
        }

        var updates = {};
        var postData = {
          homeService: isCheck,
          username: id,
          firtName: fName.value,
          lastName: lName.value,
          shop: shop.value,
          email: email.value,
          skills: skills.value,
          bio: bio.value,
          title: title.value,
          categories: categories.value,
          status: status,
          profileImage: downloadURL,
        };
        updates["/technicians/" + id] = postData;
        firebase.database().ref().update(updates);

        clearInputs();
        alert("Please wait for the confirmation of the admin.");
        window.location.href = "index.html";
      });
    }
  );
}

// function registerAccount() {
//   if (chekYes.checked == true) {
//     var isCheck = "yes";
//   } else {
//     var isCheck = "no";
//   }
//   const id = localStorage.getItem("userName");
//   techRef.child(id).set({
//     homeService: isCheck,
// username: id,
//     firtName: fName.value,
//     lastName: lName.value,
//     shop: shop.value,
//     email: email.value,
//     skills: skills.value,
//     bio: bio.value,
//     title: title.value,
//     categories: categories.value,
//     status: status,
//   });
// }

function clearInputs() {
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("shop").value = "";
  document.getElementById("email").value = "";
  document.getElementById("skills").value = "";
  document.getElementById("bio").value = "";
  document.getElementById("title").value = "";
  document.getElementById("category").value = "";
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
