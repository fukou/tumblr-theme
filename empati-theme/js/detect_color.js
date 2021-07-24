const fac = new FastAverageColor();
const imageGrid = document.querySelectorAll(".posts .posts__image");

window.addEventListener("load", function () {
   for (let i = 0; i < imageGrid.length; i++) {
      let image = imageGrid[i].querySelector("img");
      let users = imageGrid[i].parentElement.querySelector(".posts__user");

      let imageURL = image.src;
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageURL;

      fac.getColorAsync(img)
         .then((color) => {
            if (users) {
               users.querySelector("span").style.backgroundColor = color.rgba;
               users.querySelector("span").style.color = color.isDark ? "#fff" : "#000";
            }
         })
         .catch((e) => {
            console.log(e);
         });
   }
});
