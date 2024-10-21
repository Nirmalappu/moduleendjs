
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '12345') {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('todoPage').style.display = 'block';
    } else {
        alert('Invalid Username and Password!');
    }
}


function logout() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('todoPage').style.display = 'none';
    document.getElementById('todoBody').innerHTML = '';
}


function fetchTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            const todoBody = document.getElementById('todoBody');
            todoBody.innerHTML = ''; 

            data.forEach(todo => {
                const row = document.createElement('tr');

                
                const idCell = document.createElement('td');
                idCell.textContent = todo.id;

                
                const titleCell = document.createElement('td');
                titleCell.textContent = todo.title;

                
                const completedCell = document.createElement('td');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.completed;

                
                if (!todo.completed) {
                    checkbox.addEventListener('change', () => {
                        
                        todo.completed = checkbox.checked;
                        updateTodoStatus(todo.id, todo.completed);
                    });
                } else {
                    checkbox.disabled = true;
                }

                completedCell.appendChild(checkbox);
                row.appendChild(idCell);
                row.appendChild(titleCell);
                row.appendChild(completedCell);

                todoBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching todos:', error));
}


function updateTodoStatus(id, completed) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
    })
    .then(response => response.json())
    .then(data => {
        console.log(`Todo ${id} updated successfully:`, data);
    })
    .catch(error => console.error('Error updating todo:', error));
}
