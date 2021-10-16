const open = document.querySelector(".nav .nav__hamburger");
const close = document.querySelector(".link .nav__hamburger--close");
const link = document.querySelector(".link");
const blur = document.querySelector(".wrapper__blur");

const overlay = document.querySelector(".link__overlay");

let scrollpos = window.scrollY;
const header = document.querySelector("nav");
const header_height = header.offsetHeight;

const add_class_on_scroll = () => header.classList.add("fade-in");
const remove_class_on_scroll = () => header.classList.remove("fade-in");

window.addEventListener("scroll", function () {
  scrollpos = window.scrollY;

  if (scrollpos >= header_height) {
    add_class_on_scroll();
  } else {
    remove_class_on_scroll();
  }
});

open.addEventListener("click", function (e) {
  e.preventDefault();

  document.body.classList.add("is-hidden");
  link.classList.add("is-shown");
  link.querySelector(".link__inner").classList.add("is-appear");
  blur.classList.add("is-blurred");
});

close.addEventListener("click", function (e) {
  e.preventDefault();

  document.body.classList.remove("is-hidden");
  link.querySelector(".link__inner").classList.remove("is-appear");

  setTimeout(function () {
    link.classList.remove("is-shown");
    blur.classList.remove("is-blurred");
  }, 800);
});

// overlay.addEventListener("click", function(e) {
//     e.preventDefault();

//     document.body.classList.remove("is-hidden");
//     link.querySelector(".link__inner").classList.remove("is-appear");

//     setTimeout(function() {
//         link.classList.remove("is-shown");
//       }, 800);

// });
