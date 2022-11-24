const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#post-title").value.trim();
    const content = document.querySelector("#post-content").value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/posts`, {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        window.alert("Failed to create new post!");
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
  
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to delete blog post!");
      }
    }
  };
  
  document
    .querySelector(".new-project-form")
    .addEventListener("submit", newFormHandler);
  
  document
    .querySelector(".project-list")
    .addEventListener("click", delButtonHandler);