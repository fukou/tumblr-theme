const buttonLink = document.querySelectorAll(".posts__perma--note button");
buttonLink.forEach(function(button, index) {
    // button.addEventListener("click", function() {
    //     if(button.nextElementSibling) {
    //         button.nextElementSibling.classList.toggle("is-shown");
    //     }
    // });
    document.addEventListener('click', function(event) {
        var isClickInside = button.contains(event.target);
      
        if (isClickInside) {
            if(button.nextElementSibling) {
                button.nextElementSibling.classList.toggle("is-shown");
            }
        } else {
            button.nextElementSibling.classList.remove("is-shown");
        }
      });
});
