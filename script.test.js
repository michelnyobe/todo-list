const { fireEvent, waitFor } = require('@testing-library/dom');
require('@testing-library/jest-dom');

document.body.innerHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des tâches</title>
</head>
<body>
    <div class="todo-container">
        <h1>Liste des Tâches</h1>
        <form id="todo-form">
            <input type="text" id="todo-input" placeholder="Entrer une nouvelle tâche">
            <button type="submit">Ajouter</button>
        </form>
        <ul id="todo-list"></ul>
    </div>
    <script src="script.js"></script>
</body>
</html>
`;

require('./script');

describe('To-Do List Application', () => {
    let todoInput, todoForm, todoList;

    beforeEach(() => {
        todoInput = document.getElementById('todo-input');
        todoForm = document.getElementById('todo-form');
        todoList = document.getElementById('todo-list');
        // Nettoyer la liste des tâches avant chaque test
        todoList.innerHTML = '';
    });

    test('should add a new todo item to the list', async () => {
        const newTodo = 'Learn Testing';

        // Ajoutez une nouvelle tâche
        fireEvent.input(todoInput, { target: { value: newTodo } });
        fireEvent.submit(todoForm);

        // Attendez que les mises à jour du DOM soient effectuées
        await waitFor(() => {
            // Vérifiez que l'élément a été ajouté
            const todoItem = todoList.querySelector('li');
            expect(todoItem).toBeInTheDocument();
            expect(todoItem.textContent).toContain(newTodo);

            // Vérifiez également que le bouton de suppression est présent
            const deleteButton = todoItem.querySelector('button');
            expect(deleteButton).toBeInTheDocument();
            expect(deleteButton.textContent).toBe('Supprimer');
        });
    });

    test('should not add an empty todo item to the list', async () => {
        // Assurez-vous que la liste des tâches est vide avant la soumission
        expect(todoList.children.length).toBe(0);

        // Soumettez le formulaire sans entrer de texte
        fireEvent.submit(todoForm);

        // Attendez que les mises à jour du DOM soient effectuées
        await waitFor(() => {
            // Vérifiez que la liste des tâches est toujours vide
            expect(todoList.children.length).toBe(0);
        });
    });

    test('should clear the input field after adding a new todo', async () => {
        const newTodo = 'Learn Testing';

        // Ajoutez une nouvelle tâche
        fireEvent.input(todoInput, { target: { value: newTodo } });
        fireEvent.submit(todoForm);

        // Attendez que les mises à jour du DOM soient effectuées
        await waitFor(() => {
            // Vérifiez que le champ de saisie est vide
            expect(todoInput.value).toBe('');
        });
    });

    test('should delete a todo item from the list', async () => {
        const newTodo = 'Learn Deletion';

        // Ajoutez une nouvelle tâche
        fireEvent.input(todoInput, { target: { value: newTodo } });
        fireEvent.submit(todoForm);

        // Attendez que les mises à jour du DOM soient effectuées
        await waitFor(() => {
            const todoItem = todoList.querySelector('li');
            expect(todoItem).toBeInTheDocument();
            expect(todoItem.textContent).toContain(newTodo);

            // Vérifiez également que le bouton de suppression est présent
            const deleteButton = todoItem.querySelector('button');
            expect(deleteButton).toBeInTheDocument();
            expect(deleteButton.textContent).toBe('Supprimer');

            // Cliquez sur le bouton de suppression
            fireEvent.click(deleteButton);

            // Attendre la mise à jour du DOM
            waitFor(() => {
                // Vérifiez que l'élément a été supprimé
                expect(todoList.querySelector('li')).toBeNull();
            });
        });
    });
});
