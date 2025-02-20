// Ensure User is Logged In
function checkLogin() {
    const token = localStorage.getItem("token");

    // Agar token nahi hai to user ko login page (index.html) par bhej do
    if (!token) {
        alert("Please log in to access this page.");
        window.location.href = "index.html"; // Redirect to login page
    }
}

// Call Function on Page Load
window.onload = checkLogin;
