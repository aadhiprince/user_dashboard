const userTable = document.querySelector("#userTable tbody");
const userForm = document.getElementById("userForm");
const userModal = document.getElementById("userModal");
const addUserBtn = document.getElementById("addUserBtn");
const closeBtn = document.querySelector(".close");

let editingUserId = null;


addUserBtn.addEventListener("click", () => {
  userForm.reset();
  editingUserId = null;
  document.getElementById("modalTitle").textContent = "Add User";
  showModal();
});

closeBtn.addEventListener("click", hideModal);
window.addEventListener("click", (e) => {
  if (e.target === userModal) hideModal();
});

function showModal() {
  userModal.classList.remove("hidden");
}

function hideModal() {
  userModal.classList.add("hidden");
}


function fetchUsers() {
  fetch("http://localhost:3000/api/users")
    .then((res) => res.json())
    .then((users) => {
      userTable.innerHTML = "";
      users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>${user.status}</td>
          <td>
            <button onclick="editUser(${user.id}, '${escape(user.name)}', '${escape(user.email)}', '${escape(user.role)}', '${escape(user.status)}')">Edit</button>
            <button onclick="deleteUser(${user.id})">Delete</button>
          </td>
        `;
        userTable.appendChild(row);
      });
    });
}


function escape(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, "&quot;");
}

// Form submit: Add or Update
userForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const user = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    role: document.getElementById("role").value,
    status: document.getElementById("status").value,
  };

  if (editingUserId) {
    fetch(`http://localhost:3000/api/users/${editingUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      hideModal();
      fetchUsers();
    });
  } else {
    fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      hideModal();
      fetchUsers();
    });
  }
});

// Edit user
function editUser(id, name, email, role, status) {
  editingUserId = id;
  document.getElementById("modalTitle").textContent = "Edit User";
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("role").value = role;
  document.getElementById("status").value = status;
  showModal();
}

// Delete user
function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
    }).then(() => fetchUsers());
  }
}

fetchUsers();


