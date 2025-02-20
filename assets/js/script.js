// Login Function (JWT Authentication)
async function validateLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var errorMsg = document.getElementById("error-msg");
  var modalContent = document.querySelector(".modal-content");

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store Token & Set Session
      localStorage.setItem("token", data.token);
      sessionStorage.setItem("isLoggedIn", "true");

      // Redirect to Dashboard or Another Page
      window.location.href = "index.html";
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorMsg.innerText = error.message;
    errorMsg.style.display = "block"; // Show error message
    modalContent.classList.add("shake"); // Apply shake effect

    // Remove shake effect after animation
    setTimeout(() => modalContent.classList.remove("shake"), 500);
  }
}

// Logout Function
function logout() {
  localStorage.removeItem("token"); // JWT Token Remove karein
  sessionStorage.removeItem("isLoggedIn"); // Session Clear karein
  window.location.href = "index.html"; // Redirect to Login Page
}

// Fetch Contact Form Data
async function fetchContactFormData() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/contact", {
      method: "GET",
      headers: { Authorization: token },
    });

    if (response.status === 401) {
      throw new Error("Unauthorized Access. Please log in.");
    }

    const data = await response.json();
    const contactTable = document.getElementById("contact-table");

    if (contactTable) {
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                  <td>${item.name}</td>
                  <td>${item.email}</td>
                  <td>${item.number}</td>
                  <td>${item.qualification}</td>
                  <td>${item.subject}</td>
                  <td>${item.message}</td>
                  <td>${item.createdAt}</td>
              `;
        contactTable.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error fetching contact data:", error);
  }
}

// Fetch Student Registration Data
async function fetchRegistrationData() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/registration", {
      method: "GET",
      headers: { Authorization: token },
    });

    if (response.status === 401) {
      throw new Error("Unauthorized Access. Please log in.");
    }

    const data = await response.json();
    const registrationTable = document.getElementById("registration-table");

    if (registrationTable) {
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                  <td>${item.name}</td>
                  <td>${item.mobile}</td>
                  <td>${item.email}</td>
                  <td>${item.institute}</td>
                  <td>${item.education}</td>
                  <td>${item.city}</td>
                  <td>${item.timestamp}</td>
              `;
        registrationTable.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error fetching registration data:", error);
  }
}

// Fetch Student Results Data
async function fetchResultsData() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/result", {
      method: "GET",
      headers: { Authorization: token },
    });

    if (response.status === 401) {
      throw new Error("Unauthorized Access. Please log in.");
    }

    const data = await response.json();
    const resultTable = document.getElementById("result-body");

    if (resultTable) {
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                  <td>${item.rank}</td>
                  <td>${item.name}</td>
                  <td>${item.mobile}</td>
                  <td>${item.score}</td>
                  <td>${item.total}</td>
                  <td>${item.result}</td>
                  <td>${item.timestamp}</td>
              `;
        resultTable.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error fetching results data:", error);
  }
}

// Run functions when DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  fetchContactFormData();
  fetchRegistrationData();
  fetchResultsData();
});
