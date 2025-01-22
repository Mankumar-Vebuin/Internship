import userData from "../data.js";
import { UserType } from "../Types/types.js";

let editIndex: number | null = null;

let addUserButton: HTMLElement = document.querySelector(
  ".add-user"
) as HTMLElement;
let userFormSection: HTMLElement = document.querySelector(
  ".user-form-container"
) as HTMLElement;
let userForm: HTMLFormElement = document.querySelector(
  ".user-form"
) as HTMLFormElement;
let SubmitButton: HTMLElement = document.querySelector(
  ".submit-form"
) as HTMLElement;
let errorElement: HTMLElement = document.querySelector(
  ".error-element"
) as HTMLElement;
let CloseButton: HTMLElement = document.querySelector(
  ".close-btn-container"
) as HTMLElement;
let searchElement: HTMLElement = document.querySelector(
  ".search"
) as HTMLElement;

addUserButton.addEventListener("click", handleButtonToggle);
userForm.addEventListener("submit", handleFormData);
CloseButton.addEventListener("click", handleButtonToggle);
searchElement.addEventListener("input", handleSearch);

renderCards();

function renderCards(RenderUserData = userData): void {
  let userDataContainer: HTMLElement = document.querySelector(
    ".user-data-container"
  ) as HTMLElement;
  userDataContainer.innerHTML = "";
  RenderUserData.forEach((user, i): void => {
    let element: HTMLElement = document.createElement("div");
    element.classList.add("user-card");
    let imagetype: string =
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

    const deleteButton: HTMLElement = element.querySelector(
      ".delete-card-button"
    ) as HTMLElement;
    deleteButton.addEventListener("click", () => handleDeleteCard(i));

    const editButton: HTMLElement = element.querySelector(
      ".edit-card-button"
    ) as HTMLElement;
    editButton.addEventListener("click", () => handleEditCard(i));

    userDataContainer.appendChild(element);
  });
}

function handleButtonToggle(): void {
  userFormSection.classList.toggle("hidden");
  if (!userFormSection.classList.contains("hidden")) {
    userForm.reset();
    clearErrorMessage();
    editIndex = null;
  }
}

function handleFormData(e: SubmitEvent): void {
  e.preventDefault();
  let errors: string[] = [];
  let valid: boolean = true;
  let obj: UserType = {
    key: 0,
    firstName: "",
    lastName: "",
    gender: "",
    hobby: "",
    birthdate: "",
    mobileNo: "",
  };

  const form: HTMLFormElement = e.target as HTMLFormElement;

  for (let i = 0; i < form.elements.length; i++) {
    const input = form.elements[i] as HTMLInputElement;

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
  } else {
    obj.key = userData.length + 1;
    userData.push(obj);
  }

  renderCards();
  form.reset();
  handleButtonToggle();
}

function displayErrorMessage(errors: string[]) {
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

function handleDeleteCard(i: number) {
  userData.splice(i, 1);
  renderCards();
}

function handleEditCard(i: number): void {
  handleButtonToggle();
  const element = userData[i];
  editIndex = i;

  const firstNameInputElement =
    document.querySelector<HTMLInputElement>(".input-first-name");
  const lastNameInputElement =
    document.querySelector<HTMLInputElement>(".input-Last-name");
  const maleGenderInputElement =
    document.querySelector<HTMLInputElement>("#input-gender-male");
  const femaleGenderInputElement = document.querySelector<HTMLInputElement>(
    "#input-gender-female"
  );
  const hobbyInputElement =
    document.querySelector<HTMLInputElement>(".input-hobby");
  const birthdateInputElement =
    document.querySelector<HTMLInputElement>(".input-birthdate");
  const mobileNoInputElement =
    document.querySelector<HTMLInputElement>(".input-mobile-no");

  if (firstNameInputElement) firstNameInputElement.value = element.firstName;
  if (lastNameInputElement) lastNameInputElement.value = element.lastName;

  if (maleGenderInputElement && femaleGenderInputElement) {
    if (element.gender === "male") {
      maleGenderInputElement.checked = true;
    } else {
      femaleGenderInputElement.checked = true;
    }
  }

  if (hobbyInputElement) hobbyInputElement.value = element.hobby;

  if (birthdateInputElement) {
    const [day, month, year] = element.birthdate.split("/");
    birthdateInputElement.value = `${year}-${month}-${day}`;
  }

  if (mobileNoInputElement) mobileNoInputElement.value = element.mobileNo;
}

function handleSearch(e: Event): void {
  const target = e.target as HTMLInputElement;
  showFilteredUsers(target.value);
}

function debounce<T extends (...args: any[]) => void>(
  cb: T,
  delay: number = 1000
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

const showFilteredUsers = debounce((input: string): void => {
  const text = input.toLowerCase();
  const filteredUserData = userData.filter((user) => {
    const firstNameMatch = user.firstName.toLowerCase().includes(text);
    const lastNameMatch = user.lastName.toLowerCase().includes(text);
    return firstNameMatch || lastNameMatch;
  });
  renderCards(filteredUserData);
});
