const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const user = document.querySelector("#user-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
  
    if (user && password) {
      // Send a POST request to the API endpoint
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const user = document.querySelector("#user-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    if (user && email && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ user, email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  };
  
  window.onload = function () {
  const loginForm = document.querySelector(".login-form");
  if(loginForm){
    loginForm.addEventListener("submit", loginFormHandler);
  }
  
  const signUpForm = document.querySelector(".signup-form");
  if(signUpForm) {
  signUpForm.addEventListener("submit", signupFormHandler);
  }
  };