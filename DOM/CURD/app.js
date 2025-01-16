(function () {
  let container = document.querySelector(".container");
  let input = document.querySelector(".input-field");
  let button = document.querySelector(".add-todo");
  let todoContainer = document.querySelector(".todo-container");

  let todos = [];

  button.addEventListener("click", handleClick);

  function handleClick() {
    let todoText = input.value.trim();
    if (todoText !== "") {
      todos.push(todoText);
      input.value = "";
      renderTodos();
    }
  }

  function renderTodos() {
    todoContainer.innerHTML = "";
    todos.forEach(function (e, i) {
      let p = document.createElement("p");
      let removeButton = document.createElement("button");
      let editButton = document.createElement("button");

      removeButton.innerText = "remove";
      editButton.innerText = "edit";

      removeButton.classList.add("remove-btn")
      editButton.classList.add("edit-btn")

      removeButton.id = `remove-${i}`;
      editButton.id = `edit-${i}`;

      removeButton.addEventListener("click", function () {
        handleRemove(i);
      });

      editButton.addEventListener("click", function () {
        handleEdit(i);
      });

      p.innerText = e;
      p.classList.add("task-item")
      p.append(editButton);
      p.append(removeButton);
      todoContainer.appendChild(p);
    });
  }

  function handleRemove(index) {
    todos.splice(index, 1);
    renderTodos();
  }

  function handleEdit(index) {
    let newTodo = prompt("Edit your todo:", todos[index]);
    if (newTodo !== null && newTodo.trim() !== "") {
      todos[index] = newTodo;
      renderTodos();
    }
  }
})();
