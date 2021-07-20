let nonModalNodes = document.querySelectorAll(
   'body *:not(.modal):not([tabindex="-1"])'
);

const allPosts = document.querySelectorAll(".posts");
const modal = document.querySelector(".modal");
const modal__inner = document.querySelector(".modal__inner");
const modal__close = document.querySelector(".modal__close");
const openDialog = function () {
   modal.classList.add("is-appear");
   modal.focus();
   document.body.style.overflow = "hidden";

   var modalNodes = Array.from(document.querySelectorAll(".modal *"));

   if(modal.children[1].offsetHeight >= 600) {
      modal.classList.remove("is-center")
   } else {
      modal.classList.add("is-center")
   }

   for (var i = 0; i < nonModalNodes.length; i++) {
      var node = nonModalNodes[i];

      if (!modalNodes.includes(node)) {
         node._prevTabindex = node.getAttribute("tabindex");
         node.setAttribute("tabindex", -1);
         node.style.outline = "none";
      }
   }
};

const closeDialog = function () {
   modal__inner.innerHTML = "";
   modal.classList.remove("is-appear");

   document.body.style.overflow = null;

   // restore or remove tabindex from nodes
   for (var i = 0; i < nonModalNodes.length; i++) {
      var node = nonModalNodes[i];
      if (node._prevTabindex) {
         node.setAttribute("tabindex", node._prevTabindex);
         node._prevTabindex = null;
      } else {
         node.removeAttribute("tabindex");
      }
      node.style.outline = null;
   }
};

allPosts.forEach(function (post, idx) {
    const btn = post.querySelector(".btn-post").parentElement;
    if(btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const p = post.cloneNode(true);
            modal__inner.appendChild(p);
      
            openDialog();
         });
    }
   //  post.addEventListener("click", function (e) {
   //      const p = post.cloneNode(true);
   //      modal__inner.appendChild(p);
  
   //      openDialog();
   //   });
});

modal__close.addEventListener("click", function (e) {
   closeDialog();
});
