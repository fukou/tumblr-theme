const buttonLink = document.querySelectorAll(".posts__perma--note button");

buttonLink.forEach(function(button, index) {
    button.addEventListener("click", function() {
        if(button.nextElementSibling) {
            button.nextElementSibling.classList.toggle("is-shown");
        }
    });
});