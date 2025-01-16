var userData = [
  {
    key: "1",
    firstName: "Mann",
    lastName: "Mendapara",
    gender: "male",
    hobby: "Vollyaball",
    birthdate: "24/09/2003",
    mobileNo: "9265755899",
  },
  {
    key: "2",
    firstName: "Mann",
    lastName: "Mendapara",
    gender: "male",
    hobby: "Vollyaball",
    birthdate: "24/09/2003",
    mobileNo: "9265755899",
  },
  {
    key: "3",
    firstName: "Mann",
    lastName: "Mendapara",
    gender: "Female",
    hobby: "Vollyaball",
    birthdate: "24/09/2003",
    mobileNo: "9265755899",
  },
  {
    key: "4",
    firstName: "Mann",
    lastName: "Mendapara",
    gender: "male",
    hobby: "Vollyaball",
    birthdate: "24/09/2003",
    mobileNo: "9265755899",
  },
  {
    key: "5",
    firstName: "Mann",
    lastName: "Mendapara",
    gender: "Female",
    hobby: "Vollyaball",
    birthdate: "24/09/2003",
    mobileNo: "9265755899",
  },
];
var editIndex = null;

renderCards();

let addUserButton = document.querySelector(".add-user");
let userFormSection = document.querySelector(".user-form-container");
let userForm = document.querySelector(".user-form");
let SubmitButton = document.querySelector(".submit-form");
let errorElement = document.querySelector(".error-element");
let CloseButton = document.querySelector(".close-btn-container");

addUserButton.addEventListener("click", handleButtonToggle);
userForm.addEventListener("submit", handleFormData);
CloseButton.addEventListener("click", handleButtonToggle);

function renderCards() {
  let userDataContainer = document.querySelector(".user-data-container");
  userDataContainer.innerHTML = "";
  userData.forEach((user, i) => {
    let element = document.createElement("div");
    element.classList.add("user-card");
    let imagetype =
      user.gender === "male" ? "img_avatar.png" : "img_avatar2.png";
    element.innerHTML = `
              <button class="delete-card-button" key=${i}><abbr title="Delete Card"><img src="./assets/images/Cross.jpg" alt="delete"></img></button>
              <button class="edit-card-button" key=${i}><abbr title="Edit Card"><img src="./assets/images/edit-icon.png" alt="edit"></img></button>
              <img class="avatar" src="./assets/images/${imagetype}" alt="Avatar" style="width: 100%" />
              <div class="user-details-container">
                <p class="detail first-name last-name">${user.firstName} ${user.lastName}</p>
                <p class="detail gender">${user.gender}</p>
                <p class="detail hobby">${user.hobby}</p>
                <p class="detail birthdate">${user.birthdate}</p>
                <p class="detail mobile-no">${user.mobileNo}</p>
              </div>`;

    const deleteButton = element.querySelector(".delete-card-button");
    deleteButton.addEventListener("click", () => handleDeleteCard(i));

    const editButton = element.querySelector(".edit-card-button");
    editButton.addEventListener("click", () => handleEditCard(i));

    userDataContainer.appendChild(element);
  });
}

function handleButtonToggle() {
  userFormSection.classList.toggle("hidden");
}

function handleFormData(e) {
  e.preventDefault();
  let errors = [];
  let valid = true;
  let obj = {};

  for (let i = 0; i < e.target.length; i++) {
    const input = e.target[i];

    if (input.name === "mobileNo" && input.value.length !== 10) {
      errors.push("Invalid Phone Number");
      input.classList.add("input-error");
      valid = false;
      break;
    }

    if (input.name === "birthdate") {
      let splitedDate = input.value.split("-");
      let newDateFormate = `${splitedDate[0]}-${splitedDate[1]}-${splitedDate[2]}`;
      let currentDate = new Date().toISOString().split("T")[0];

      if (new Date(newDateFormate) > new Date(currentDate)) {
        errors.push("Invalid Birthdate");
        input.classList.add("input-error");
        valid = false;
        break;
      }
    }

    if (input.type === "radio" && input.name === "gender") {
      if (input.checked) {
        obj[input.name] = input.value;
      }
      continue;
    }

    if (input.name) {
      obj[input.name] = input.value;
    }
  }

  if (!valid) {
    displayErrorMessage(errors);
    return;
  }

  clearErrorMessage();

  if (editIndex !== null) {
    userData[editingIndex] = { key: userData[editingIndex].key, ...obj };
    editIndex = null;
  } else {
    obj.key = (userData.length + 1).toString();
    userData.push(obj);
  }

  renderCards();
  e.target.reset();
  handleButtonToggle();
}

function displayErrorMessage(errors) {
  errorElement.innerHTML = "";
  errors.forEach((error) => {
    let p = document.createElement("p");
    p.innerText = error;
    errorElement.appendChild(p);
  });
}

function clearErrorMessage() {
  errorElement.innerHTML = "";
}

function handleDeleteCard(i) {
  userData.splice(i, 1);
  renderCards();
}

function handleEditCard(i) {
  let element = userData[i];
  editIndex = i;
  handleButtonToggle();

  const firstNameInputElement = document.querySelector(".input-first-name");
  const lastNameInputElement = document.querySelector(".input-Last-name");
  const maleGenderInputElement = document.querySelector("#input-gender-male");
  const femaleGenderInputElement = document.querySelector(
    "#input-gender-female"
  );
  const hobbyInputElement = document.querySelector(".input-hobby");
  const birthdateInputElement = document.querySelector(".input-birthdate");
  const mobileNoInputElement = document.querySelector(".input-mobile-no");

  firstNameInputElement.value = element.firstName;
  lastNameInputElement.value = element.lastName;

  if (element.gender === "male") {
    maleGenderInputElement.checked = true;
  } else if (element.gender === "female") {
    femaleGenderInputElement.checked = true;
  }

  hobbyInputElement.value = element.hobby;

  const [day, month, year] = element.birthdate.split("/");
  birthdateInputElement.value = `${year}-${month}-${day}`;

  mobileNoInputElement.value = element.mobileNo;
}
