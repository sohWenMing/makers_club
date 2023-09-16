document.addEventListener("DOMContentLoaded", () => {
    console.log('loaded')
    const hamburgerButton = document.getElementById('hamburger-icon')
    const mobileNav = document.querySelector('.mobile-navbar')
    hamburgerButton.addEventListener("click", () => {
        mobileNav.classList.toggle("open");  
    })
})