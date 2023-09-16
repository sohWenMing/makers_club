document.addEventListener("DOMContentLoaded", () => {
    console.log('loaded')
    const hamburgerButton = document.getElementById('hamburger-icon')
    const mobileNav = document.querySelector('.mobile-navbar')
    hamburgerButton.addEventListener("click", () => {
        console.log("button loaded")
        mobileNav.classList.toggle("open");
    })
})