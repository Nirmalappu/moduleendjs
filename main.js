
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
                    checkbox.addEventListener('click', () => {
                        todo.completed = checkbox.checked;
                   
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