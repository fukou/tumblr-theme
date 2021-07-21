// const btn = document.querySelectorAll(".wrapper__toggle--inner");

// btn.forEach(function(button, idx) {
//     console.log(button)
//     button.addEventListener("click", function() {
//         if(button.classList.contains("grid")) {
//             button.classList.remove("actived")
//         } else {
//             button.classList.remove("actived")
//         }
//     })
// });

let wrapper = document.querySelector(".wrapper__blog");
const listButton = document.querySelector(".wrapper__toggle--inner .list");
const gridButton = document.querySelector(".wrapper__toggle--inner .grid");

listButton.addEventListener("click", function() {
    gridButton.classList.remove("actived");
    listButton.classList.add("actived");
    wrapper.classList.remove("is-grid");
    wrapper.classList.add("is-list");
});

gridButton.addEventListener("click", function() {
    listButton.classList.remove("actived");
    gridButton.classList.add("actived");

    wrapper.classList.remove("is-list");
    wrapper.classList.add("is-grid");
});
