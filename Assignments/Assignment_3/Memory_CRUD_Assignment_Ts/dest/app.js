"use strict";
var userData = [
    {
        key: 1,
        firstName: "Mann",
        lastName: "Mendapara",
        gender: "male",
        hobby: "Vollyaball",
        birthdate: "24/09/2003",
        mobileNo: "1000000000",
    },
    {
        key: 2,
        firstName: "Anurag",
        lastName: "Dalsaniya",
        gender: "male",
        hobby: "Vollyaball",
        birthdate: "12/02/2004",
        mobileNo: "1254796235",
    },
    {
        key: 3,
        firstName: "Hetvi",
        lastName: "Godhani",
        gender: "Female",
        hobby: "Movies and Series",
        birthdate: "05/01/2004",
        mobileNo: "4866579298",
    },
    {
        key: 4,
        firstName: "Jaivin",
        lastName: "Savaliya",
        gender: "male",
        hobby: "Reading",
        birthdate: "24/09/2003",
        mobileNo: "4596566651",
    },
    {
        key: 5,
        firstName: "Priyanka",
        lastName: "Lalakiya",
        gender: "Female",
        hobby: "Yoga",
        birthdate: "04/04/2004",
        mobileNo: "1111111111",
    },
];
let editIndex = null;
let addUserButton = document.querySelector(".add-user");
let userFormSection = document.querySelector(".user-form-container");
let userForm = document.querySelector(".user-form");
let SubmitButton = document.querySelector(".submit-form");
let errorElement = document.querySelector(".error-element");
let CloseButton = document.querySelector(".close-btn-container");
let searchElement = document.querySelector(".search");
addUserButton.addEventListener("click", handleButtonToggle);
userForm.addEventListener("submit", handleFormData);
CloseButton.addEventListener("click", handleButtonToggle);
searchElement.addEventListener("input", handleSearch);
renderCards();
function renderCards(RenderUserData = userData) {
    let userDataContainer = document.querySelector(".user-data-container");
    userDataContainer.innerHTML = "";
    RenderUserData.forEach((user, i) => {
        let element = document.createElement("div");
        element.classList.add("user-card");
        let imagetype = user.gender === "male" ? "img_avatar.png" : "img_avatar2.png";
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
    if (!userFormSection.classList.contains("hidden")) {
        userForm.reset();
        clearErrorMessage();
        editIndex = null;
    }
}
function handleFormData(e) {
    e.preventDefault();
    let errors = [];
    let valid = true;
    let obj = {
        key: 0,
        firstName: "",
        lastName: "",
        gender: "",
        hobby: "",
        birthdate: "",
        mobileNo: "",
    };
    const form = e.target;
    for (let i = 0; i < form.elements.length; i++) {
        const input = form.elements[i];
        if (input.name === "mobileNo" && input.value.length !== 10) {
            errors.push("Invalid Phone Number");
            input.classList.add("input-error");
            setTimeout(() => {
                input.classList.remove("input-error");
            }, 3000);
            valid = false;
            break;
        }
        if (input.name === "birthdate") {
            const currentDate = new Date().toISOString().split("T")[0];
            if (new Date(input.value) > new Date(currentDate)) {
                errors.push("Invalid Birthdate");
                input.classList.add("input-error");
                setTimeout(() => {
                    input.classList.remove("input-error");
                }, 3000);
                valid = false;
                break;
            }
            const [year, month, day] = input.value.split("-");
            obj[input.name] = `${day}/${month}/${year}`;
            continue;
        }
        if (input.type === "radio" && input.name === "gender") {
            if (input.checked) {
                obj[input.name] = input.value;
            }
            continue;
        }
        if (input.name in obj) {
            obj[input.name] = input.value;
        }
    }
    if (!valid) {
        displayErrorMessage(errors);
        return;
    }
    clearErrorMessage();
    if (editIndex !== null) {
        userData.splice(editIndex, 1);
        userData.splice(editIndex, 0, obj);
        editIndex = null;
    }
    else {
        obj.key = userData.length + 1;
        userData.push(obj);
    }
    renderCards();
    form.reset();
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
    handleButtonToggle();
    const element = userData[i];
    editIndex = i;
    console.log(editIndex, i, element);
    const firstNameInputElement = document.querySelector(".input-first-name");
    const lastNameInputElement = document.querySelector(".input-Last-name");
    const maleGenderInputElement = document.querySelector("#input-gender-male");
    const femaleGenderInputElement = document.querySelector("#input-gender-female");
    const hobbyInputElement = document.querySelector(".input-hobby");
    const birthdateInputElement = document.querySelector(".input-birthdate");
    const mobileNoInputElement = document.querySelector(".input-mobile-no");
    if (firstNameInputElement)
        firstNameInputElement.value = element.firstName;
    if (lastNameInputElement)
        lastNameInputElement.value = element.lastName;
    if (maleGenderInputElement && femaleGenderInputElement) {
        if (element.gender === "male") {
            maleGenderInputElement.checked = true;
        }
        else {
            femaleGenderInputElement.checked = true;
        }
    }
    if (hobbyInputElement)
        hobbyInputElement.value = element.hobby;
    if (birthdateInputElement) {
        const [day, month, year] = element.birthdate.split("/");
        birthdateInputElement.value = `${year}-${month}-${day}`;
    }
    if (mobileNoInputElement)
        mobileNoInputElement.value = element.mobileNo;
}
function handleSearch(e) {
    const target = e.target;
    showFilteredUsers(target.value);
}
function debounce(cb, delay = 1000) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb(...args);
        }, delay);
    };
}
const showFilteredUsers = debounce((input) => {
    const text = input.toLowerCase();
    const filteredUserData = userData.filter((user) => {
        const firstNameMatch = user.firstName.toLowerCase().includes(text);
        const lastNameMatch = user.lastName.toLowerCase().includes(text);
        return firstNameMatch || lastNameMatch;
    });
    renderCards(filteredUserData);
});
