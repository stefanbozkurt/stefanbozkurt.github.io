document.addEventListener("DOMContentLoaded", () => {
    const menuLink = document.getElementById("main-menu");

    menuLink.addEventListener("click", (e) => {
        e.preventDefault();
        menuLink.classList.toggle("active");
    });
});