const todoInput = document.querySelector<HTMLInputElement>(".todo-list_input")!;
const todoListDiv = document.querySelector<HTMLDivElement>(".todo-list_div")!;
const todolistForm =
    document.querySelector<HTMLFormElement>(".todo-list_form")!;

interface Todo {
    name: string;
    hour: number;
    min: number;
    sec: number;
    isCompleted: boolean;
}

const todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

todolistForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    if (todoInput.value.trim() !== "") {
        const newTodo: Todo = {
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

const renderTodos = (): void => {
    todoListDiv.innerHTML = "";
    const todosInLS: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
    todosInLS.forEach((todo: Todo, index: number) => {
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
            const btn = todoItem.querySelector<HTMLButtonElement>(".complete")!;
            btn.textContent = "completed";
        }
        todoListDiv.appendChild(todoItem);
    });

    const deleteButtons =
        document.querySelectorAll<HTMLButtonElement>(".delete");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (e: Event) => {
            const index = Array.from(deleteButtons).indexOf(
                e.target as HTMLButtonElement
            );
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));
            renderTodos();
        });
    });

    const completeButtons =
        document.querySelectorAll<HTMLButtonElement>(".complete");
    completeButtons.forEach((button) => {
        button.addEventListener("click", (e: Event) => {
            const index = Array.from(completeButtons).indexOf(
                e.target as HTMLButtonElement
            );
            todos[index].isCompleted = true;
            localStorage.setItem("todos", JSON.stringify(todos));
            renderTodos();
        });
    });
};

renderTodos();
