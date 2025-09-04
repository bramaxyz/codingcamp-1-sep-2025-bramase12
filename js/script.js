// Ambil elemen-elemen penting
const todoInput = document.getElementById("todo");
const dateInput = document.getElementById("date");
const addButton = document.getElementById("addBtn");
const filterButton = document.getElementById("filterBtn");
const deleteAllButton = document.getElementById("deleteAllBtn");
const tableBody = document.querySelector("tbody");

let todos = []; 

// Fungsi untuk render todo ke dalam tabel
function renderTodos(list = todos) {
    tableBody.innerHTML = "";

    if (list.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 4;
        cell.textContent = "No tasks found.";
        cell.style.textAlign = "center";
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }

    list.forEach((todo, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${todo.task}</td>
            <td>${todo.dueDate}</td>
            <td>${todo.status}</td>
            <td>
                <button onclick="markDone(${index})">✔</button>
                <button onclick="deleteTodo(${index})">x</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Tambahkan todo
addButton.addEventListener("click", () => {
    const task = todoInput.value.trim();
    const dueDate = dateInput.value;

    if (task === "" || dueDate === "") {
        alert("Silakan isi task dan tanggal.");
        return;
    }

    todos.push({
        task,
        dueDate,
        status: "Pending"
    });

    renderTodos();
    todoInput.value = "";
    dateInput.value = "";
});

// Tandai selesai
function markDone(index) {
    todos[index].status = todos[index].status === "Done" ? "Pending" : "Done";
    renderTodos();
}

// Hapus todo
function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

// Hapus semua todo
deleteAllButton.addEventListener("click", () => {
    if (confirm("Yakin ingin menghapus semua?")) {
        todos = [];
        renderTodos();
    }
});

// Filter berdasarkan tanggal
filterButton.addEventListener("click", () => {
    const selectedDate = dateInput.value;
    if (selectedDate === "") {
        alert("Pilih tanggal untuk filter.");
        return;
    }

    const filtered = todos.filter(todo => todo.dueDate === selectedDate);
    renderTodos(filtered);
});
