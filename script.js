document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newTodoText = todoInput.value.trim();
        if (newTodoText !== '') {
            const newTodo = document.createElement('li');

            const todoText = document.createElement('span');
            todoText.textContent = newTodoText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', function() {
                todoList.removeChild(newTodo);
            });

            newTodo.appendChild(todoText);
            newTodo.appendChild(deleteButton);

            todoList.appendChild(newTodo);

            todoInput.value = '';
        }
    });
});
