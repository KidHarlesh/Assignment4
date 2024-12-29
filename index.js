document.addEventListener("DOMContentLoaded", function () {
  console.log("Script loaded");
  if (window.location.pathname.includes("index.html")) {
     console.log("On index.html");
    document
      .getElementById("registerForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        if (!email.includes("@")) {
          alert("Please enter a valid email address containing '@'.");
          return;
        }
        const passwordRegex =
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
          alert(
            "Password must be at least 8 characters long and include at least one letter, one number, and one special character."
          );
          return;
        }

        // Ensure all fields are filled
        if (username && email && password) {
          // Post request to an API endpoint
          const userData = {
            username: username,
            email: email,
            password: password, // In a real app, you should hash the password before sending it
          };

          fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
              alert("Account created successfully!");

              localStorage.setItem("username", username);
              // Redirect to another page
              window.location.href = "welcome.html";
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Something went wrong. Please try again later.");
            });
        } else {
          alert("Please fill in all fields.");
        }
      });
  } else if (window.location.pathname.includes("welcome.html")) {
    // Code for the welcome.html page
    const username = localStorage.getItem("username");
    const welcomeMessage = document.getElementById("welcomeMessage");

    if (username) {
      welcomeMessage.textContent = `Welcome back, ${username}!`;
    } else {
      welcomeMessage.textContent = "Welcome!";
    }
  }

  })


