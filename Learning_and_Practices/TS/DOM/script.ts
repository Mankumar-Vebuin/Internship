interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

class TodoList {
  private todos: Todo[] = [];
  private todoListElement: HTMLElement;

  constructor(todoListElement: HTMLElement) {
    this.todoListElement = todoListElement;
  }

  addTodo(title: string): void {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title,
      completed: false,
    };
    this.todos.push(newTodo);
    this.render();
  }

  toggleComplete(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.render();
    }
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.render();
  }

  render(): void {
    this.todoListElement.innerHTML = "";
    this.todos.forEach((todo) => {
      const listItem = document.createElement("li");
      listItem.className = `todo-item ${todo.completed ? "completed" : ""}`;

      const titleSpan = document.createElement("span");
      titleSpan.textContent = todo.title;
      titleSpan.onclick = () => this.toggleComplete(todo.id);

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.onclick = () => this.removeTodo(todo.id);

      listItem.appendChild(titleSpan);
      listItem.appendChild(removeButton);
      this.todoListElement.appendChild(listItem);
    });
  }
}

const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoListElement = document.getElementById("todo-list") as HTMLElement;

const myTodoList = new TodoList(todoListElement);

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = todoInput.value.trim();
  if (title) {
    myTodoList.addTodo(title);
    todoInput.value = "";
  }
});
