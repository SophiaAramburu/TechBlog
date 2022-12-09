const logout = async () => {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  };
  
  window.onload = function () {
  const logOutbutton = document.querySelector("#logout");
  if (logOutbutton) {
    logOutbutton.addEventListener("click", logout);
  }
  };