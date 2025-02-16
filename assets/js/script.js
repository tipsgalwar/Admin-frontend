// (function () {
//   "use strict";

//   /**
//    * Apply .scrolled class to the body as the page is scrolled down
//    */
//   function toggleScrolled() {
//     const selectBody = document.querySelector("body");
//     const selectHeader = document.querySelector("#header");
//     if (
//       !selectHeader.classList.contains("scroll-up-sticky") &&
//       !selectHeader.classList.contains("sticky-top") &&
//       !selectHeader.classList.contains("fixed-top")
//     )
//       return;
//     window.scrollY > 100
//       ? selectBody.classList.add("scrolled")
//       : selectBody.classList.remove("scrolled");
//   }

//   document.addEventListener("scroll", toggleScrolled);
//   window.addEventListener("load", toggleScrolled);

//   /**
//    * Mobile nav toggle
//    */
//   const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

//   function mobileNavToogle() {
//     document.querySelector("body").classList.toggle("mobile-nav-active");
//     mobileNavToggleBtn.classList.toggle("bi-list");
//     mobileNavToggleBtn.classList.toggle("bi-x");
//   }
//   mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

//   /**
//    * Hide mobile nav on same-page/hash links
//    */
//   document.querySelectorAll("#navmenu a").forEach((navmenu) => {
//     navmenu.addEventListener("click", () => {
//       if (document.querySelector(".mobile-nav-active")) {
//         mobileNavToogle();
//       }
//     });
//   });

//   /**
//    * Toggle mobile nav dropdowns
//    */
//   document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
//     navmenu.addEventListener("click", function (e) {
//       e.preventDefault();
//       this.parentNode.classList.toggle("active");
//       this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
//       e.stopImmediatePropagation();
//     });
//   });
// })();

function validateLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var errorMsg = document.getElementById("error-msg");
  var modalContent = document.querySelector(".modal-content");

  // Hardcoded credentials
  if (username === "tipsgalwar" && password === "tipsgalwar") {
    sessionStorage.setItem("isLoggedIn", "true");

    // Hide modal and show main content
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("modal-content").style.display = "block";
  } else {
    errorMsg.innerText = "Invalid username or password!";
    errorMsg.style.display = "block"; // Show error message
    modalContent.classList.add("shake"); // Apply shake effect

    // Remove shake effect after animation
    setTimeout(() => modalContent.classList.remove("shake"), 500);
  }
}

// Check login status on page load
window.onload = function () {
  if (sessionStorage.getItem("isLoggedIn") === "true") {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("modal-content").style.display = "block"; // Show main content
  } else {
    document.getElementById("loginModal").style.display = "flex"; // Show login modal
    document.getElementById("modal-content").style.display = "none"; // Hide main content
  }
};

function toggleheader() {
  var sidebar = document.getElementById("header");
  var overlay = document.getElementById("overlay");

  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Function to fetch and display data for Contact Form inquiries
async function fetchContactFormData() {
  try {
    const response = await fetch("https://admin-backend-wbbc.onrender.com/api/contact");
    const data = await response.json();
    const contactTable = document.getElementById("contact-table");
    if (contactTable) {
      // Check if the table exists
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.number}</td>
                    <td>${item.qualification}
                    <td>${item.subject}</td>
                    <td>${item.message}</td>
                `;
        contactTable.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error fetching contact data:", error);
  }
}

// Function to fetch and display data for Student Registration
async function fetchRegistrationData() {
  try {
    const response = await fetch("https://admin-backend-wbbc.onrender.com/api/registration");
    const data = await response.json();
    const registrationTable = document.getElementById("registration-table");
    if (registrationTable) {
      // Check if the table exists
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.mobile}</td>
                    <td>${item.email}</td>
                    <td>${item.institute}</td>
                    <td>${item.education}</td>
                    <td>${item.city}</td>
                `;
        registrationTable.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error fetching registration data:", error);
  }
}

// Function to fetch and display data for Results
async function fetchResultsData() {
  try {
    const response = await fetch("https://admin-backend-wbbc.onrender.com/api/result");
    const data = await response.json();
    const resultTable = document.getElementById("result-body");
    if (resultTable) {
      // Check if the table exists
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${item.rank}</td>
                <td>${item.name}</td>
                <td>${item.mobile}</td>
                <td>${item.score}</td>
                <td>${item.total}</td>
                <td>${item.result}</td>
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
