var technicianRef = firebase.database().ref("technicians/");

technicianRef.on("child_added", (snapshot) => {
  var firstName = snapshot.child("firtName").val();
  var lastName = snapshot.child("lastName").val();
  var title = snapshot.child("title").val();
  var profileImage = snapshot.child("profileImage").val();
  var username = snapshot.child("username").val();

  document.getElementById("profile-card").innerHTML += `
      <div class="profile-card">
        <div class="profile-image">
          <img src="${profileImage}" alt="">
        </div>
        <h1>${firstName} ${lastName}</h1>
        <p>${title}</p>
        <div class="price-tag">
          <div class="rating">
            <h1>5</h1>
            <i class="rating-star fa fa-star"></i>
          </div>
          <div class="price">
            <button id="${username}" onclick="applyTechRequest(this.id)">View Profile</button>
          </div>
        </div>
      </div>
    `;
});

function applyTechRequest(id) {
  // var newStr = id.substring(0, id.length - 1);
  // console.log(id);
  window.location.href = "technician-info.html";
  localStorage.setItem("techId", id);
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
