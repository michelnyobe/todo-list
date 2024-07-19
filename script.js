document.getElementById('todo-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Sélectionner les éléments du DOM
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Obtenir la valeur de l'entrée et la nettoyer
    const newTodo = input.value.trim();

    // Ne pas ajouter de tâches vides
    if (newTodo) {
        // Créer un nouvel élément de liste
        const todoItem = document.createElement('li');
        todoItem.textContent = newTodo;

        // Créer un bouton de suppression
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', function() {
            todoItem.remove();
        });

        // Ajouter le bouton à l'élément de liste
        todoItem.appendChild(deleteButton);

        // Ajouter l'élément de liste à la liste des tâches
        todoList.appendChild(todoItem);

        // Réinitialiser le champ de saisie
        input.value = '';
    }
});
