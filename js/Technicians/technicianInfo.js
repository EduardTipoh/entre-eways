let technicianId = localStorage.getItem("techId");
console.log(technicianId);

if (technicianId == null) {
  window.location.replace("index.html");
}

firebase
  .database()
  .ref("technicians/" + technicianId)
  .once("value", function (snapshot) {
    let firstName = snapshot.child("firtName").val();
    let lastName = snapshot.child("lastName").val();
    let email = snapshot.child("email").val();
    let bio = snapshot.child("bio").val();
    let skills = snapshot.child("skills").val();
    let shop = snapshot.child("shop").val();
    let image = snapshot.child("profileImage").val();
    console.log(snapshot.child("bio").val());

    document.getElementById("appReq").innerHTML = `
            <div class="appReq-img-name">
              <img src="${image}" alt="">
              <h3>5 stars</h3>
              <div class="techStars" style="color: #ffc400; font-size: 20px;">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
              </div>
            </div>
            <div class="appReq-info">
              <h2 style="padding: 5px 0;">${firstName} ${lastName}</h2>
              <h4 style="padding: 5px 0;">${shop}</h4>
              <h4 style="padding: 5px 0;">Skills: ${skills}</h4>
              <h4 style="padding: 5px 0; text-decoration: underline;">Email: ${email}</h4>
              <div class="tag-container">
                <h3 style="margin-top: 20px;">Biography</h3>
                <div style="background: #ececec; height: 30vh; padding: 10px; border-radius: 5px;">
                  <p>${bio}</p>
                </div>
              </div>
              <button onclick="apply()">Apply</button>
            </div>
    `;
  });
