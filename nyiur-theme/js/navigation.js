const currentLink = location.pathname;
const navLink = document.querySelectorAll(".nav__menu a");
navLink.forEach(function (item, idx) {
    if (item.getAttribute("href") === currentLink) {
        item.parentElement.classList.add("nav__menu--actived");
    }
});

// dark mode
const btn_dark = document.querySelector(".btn-dark");
const currentTheme = localStorage.getItem("theme");

if (currentTheme == "dark") {
    document.body.classList.add("dark-theme");
    btn_dark.innerHTML = `<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1.66 11.362A6.5 6.5 0 007.693.502a7 7 0 11-6.031 10.86z" stroke="white" stroke-linejoin="round"></path></svg>`;
} else {
    btn_dark.innerHTML = `<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M7.5 1.5v-1m0 13.99v-.998m6-5.997h1m-13 0h-1m2-4.996l-1-1m12 0l-1 1m-10 9.993l-1 1m12 0l-1-1m-2-4.997a2.999 2.999 0 01-3 2.998 2.999 2.999 0 113-2.998z" stroke="currentColor" stroke-linecap="square"></path></svg>`;
}

btn_dark.addEventListener("click", function (e) {
    e.preventDefault();
    this.classList.toggle("dark-actived");

    document.body.classList.toggle("dark-theme");

    let theme = "light";

    if (document.body.classList.contains("dark-theme")) {
        theme = "dark";
        this.innerHTML = `<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1.66 11.362A6.5 6.5 0 007.693.502a7 7 0 11-6.031 10.86z" stroke="white" stroke-linejoin="round"></path></svg>`;
    } else {
        this.innerHTML = `<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M7.5 1.5v-1m0 13.99v-.998m6-5.997h1m-13 0h-1m2-4.996l-1-1m12 0l-1 1m-10 9.993l-1 1m12 0l-1-1m-2-4.997a2.999 2.999 0 01-3 2.998 2.999 2.999 0 113-2.998z" stroke="currentColor" stroke-linecap="square"></path></svg>`;
    }

    localStorage.setItem("theme", theme);
});