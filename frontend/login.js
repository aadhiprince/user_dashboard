// Login Form

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (username && password) {
        fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {

            // Store the token in local storage
            localStorage.setItem("token", data.token);
            // Redirect to the dashboard or another page
            alert("Login successful!");
            window.location.href = "dashboard.html";
            } else {
            alert("Invalid credentials. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    } else {
        alert("Please fill in all fields.");
    }
    });
