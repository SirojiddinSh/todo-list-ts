const todoInput = document.querySelector(".todo-list_input");
const todoListDiv = document.querySelector(".todo-list_div");
const todolistForm = document.querySelector(".todo-list_form");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

todolistForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (todoInput.value.trim() !== "") {
        let newTodo = {
            name: todoInput.value,
            hour: new Date().getHours(),
            min: new Date().getMinutes(),
            sec: new Date().getSeconds(),
            isCompleted: false,
        };
        todos.push(newTodo);
        localStorage.setItem("todos", JSON.stringify(todos));
        todoInput.value = "";
        renderTodos();
    } else {
        alert("Please enter valid todo");
    }
});

const renderTodos = () => {
    todoListDiv.innerHTML = "";
    const todosInLS = JSON.parse(localStorage.getItem("todos")) || [];
    todosInLS.forEach((todo, index) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.innerHTML = `
            <div class="todo-info">
                <h3>${index + 1}.</h3>
                <h3 class="todo-name">${todo.name}</h3>
            </div>
            <span>${todo.hour}:${todo.min}:${todo.sec}</span>
            <div class="buttons">
                <button class="complete" ${
                    todo.isCompleted ? "disabled" : ""
                }>complete</button>
                <button class="delete">+</button>
            </div>
        `;
        if (todo.isCompleted) {
            todoItem.style.backgroundColor = "lightgray";
            todoItem.style.textDecoration = "line-through";
            const btn = todoItem.querySelector(".complete");
            btn.textContent = "completed";
        }
        todoListDiv.appendChild(todoItem);
    });

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = [...deleteButtons].indexOf(e.target);
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));
            renderTodos();
        });
    });

    const completeButtons = document.querySelectorAll(".complete");
    completeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = [...completeButtons].indexOf(e.target);
            todos[index].isCompleted = true;
            localStorage.setItem("todos", JSON.stringify(todos));
            renderTodos();
        });
    });
};

renderTodos();
