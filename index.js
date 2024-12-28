// document.getElementById("registerForm").addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent form from submitting traditionally

//     // Retrieve user inputs
//     const username = document.getElementById("username").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     if (username && email && password) {

//       // Redirect to another page (e.g., welcome.html)
//       window.location.href = "welcome.html"; // Replace with your target page
//     } else {
//       alert("Please fill in all fields.");
//     }
//   });

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from reloading the page

    // Retrieve user inputs
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Email validation
    if (!email.includes("@")) {
      alert("Please enter a valid email address containing '@'.");
      return; // Stop further execution if the email is invalid
    }

    // Password validation: At least one letter, one number, and one special character
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long and include at least one letter, one number, and one special character."
      );
      return; // Stop further execution if the password is invalid
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
