
document.addEventListener("DOMContentLoaded", function () {
document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preveDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  if (username && password && email) {
    fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("User registered successfully!");
          window.location.href = "login.html";
        } else {
          alert("Error registering user: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    alert("Please fill in all fields.");
  }
})
})
