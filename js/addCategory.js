if (localStorage.getItem("username") == null) {
  window.location.replace("admin-login.html");
}

function logout() {
  window.location.replace("admin-login.html");
  localStorage.clear();
}

const myRef = firebase.database().ref("categories");

const txtCategory = document.getElementById("catName");
const txtDescription = document.getElementById("catDescription");
const addBtn = document.getElementById("addBtn");
// const image = document.getElementById("coverImage");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // VALIDATION
  if (txtCategory.value == "" || txtDescription.value == "") {
    alert("Please fill up all the fields.");
    txtCategory.focus();
  } else {
    // createCategory();
    uploadImgCover();
  }
});

function uploadImgCover() {
  const imgCover = document.getElementById("coverImage").files[0];
  const imageName = imgCover.name;
  const storageRef = firebase.storage().ref("/categoryImage/" + imageName);
  const uploadTask = storageRef.put(imgCover);
  console.log(txtCategory.value);
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
        var postKey = firebase.database().ref("categories/").push().key;
        var updates = {};
        console.log(txtCategory.value);
        var postData = {
          imageURL: downloadURL,
          catName: txtCategory.value,
          catDescription: txtDescription.value,
        };
        updates["/categories/" + postKey] = postData;
        firebase.database().ref().update(updates);

        clearInputs();
        alert("New Category has been added!");
      });
    }
  );
}

function clearInputs() {
  document.querySelector("#catName").value = "";
  document.querySelector("#catDescription").value = "";
}

myRef.on("value", function (snapshot) {
  var content = "";
  snapshot.forEach(function (child) {
    var val = child.val();

    content += `
    <tr>
    <td class="table-title">${val.catName}</td>
    <td>${val.catDescription}</td>
    <td>
      <button class="table-trash fa fa-trash" title="Delete" id="${val.catId}" onClick="catDelete(this.id)">
      </button>
      <button
      class="table-edit fa fa-edit" title="Edit" id="${val.catId}" onClick="catUpdate(this.id)">
      </button>
    </td>
    </tr>`;
    document.getElementById("table-body").innerHTML = content;
  });
});

function catDelete(deleteCategory) {
  var newStr = deleteCategory.substring(0, deleteCategory.length);
  var r = confirm("Are you sure you want to delete?");
  if (r == true) {
    firebase.database().ref("categories/").child(newStr).remove();
    alert("Category Record Successfully Deleted");
  }
}

// function catUpdate(id) {
//   var uCatId = id.substring(0, id.length);
//   localStorage.setItem("update-category", uCatId);
//   document.querySelector(".update-modal").style.display = "flex";

//   let updateCategory = localStorage.getItem("update-category");
//   console.log(updateCategory);

//   firebase
//     .database()
//     .ref("categories/" + updateCategory)
//     .on("value", function (snapshot) {
//       let uCatName = snapshot.child("catName").val();
//       let uCatDes = snapshot.child("catDescription").val();

//       document.getElementById("updateCategory").innerHTML = `
//   <input type="text" name="category" id="updateName" value="${uCatName}">
//   <textarea id="updateDes" rows="5" name="description">${uCatDes}</textarea>
//   <label
//     ><p>Image must be 500x500 pixel only</p>
//     <input type="file" name="CoverImage" id="coverImage"
//   /></label>
//   <button type="button" class="login-submit" id="updateBtn" onClick="updateCategory">
//     Update
//   </button>
//   `;
//     });
// }

//update category
function updateCategory() {}

// route
document
  .getElementById("close-update-modal")
  .addEventListener("click", function () {
    document.querySelector(".update-modal").style.display = "none";
  });

document.getElementById("add-category").addEventListener("click", function () {
  document.querySelector(".cat-modal").style.display = "flex";
});

document.getElementById("close-modal").addEventListener("click", function () {
  document.querySelector(".cat-modal").style.display = "none";
});
