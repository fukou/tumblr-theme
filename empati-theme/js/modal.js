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

   console.log(modal.children[1].offsetHeight);

   if(modal.children[1].offsetHeight >= 610) {
      modal.classList.remove("is-center")
   } else {
      modal.classList.add("is-center")
   }

   for (var i = 0; i < nonModalNodes.length; i++) {
      var node = nonModalNodes[i];

      if (!modalNodes.includes(node)) {
         node._prevTabindex = node.getAttribute("tabindex");
         node.setAttribute("tabindex", -1);
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

            if(document.querySelector(".modal__inner .posts-audio")) {
               const play = document.querySelector(".modal__inner .btn-play");
               let playButton = play.querySelector('#play');
               let pauseButton = play.querySelector('#pause');

               const wavesurfer = WaveSurfer.create({
                  container: '#waveform',
                  waveColor: 'rgba(0,0,0,0.15)',
                  progressColor: 'rgba(0,0,0,0.5)'
               });

               const tumblrAudio = document.querySelector("iframe.tumblr_audio_player").getAttribute("src");
              
               const srcs = tumblrAudio.split("audio_file=")[1].split("&")[0];
               const getSources = decodeURIComponent(srcs);

               wavesurfer.load(getSources);

               play.addEventListener("click", function(e) {
                  wavesurfer.playPause();
               });
               wavesurfer.on('play', function() {
                  playButton.style.display = 'none';
                  pauseButton.style.display = 'block';
               });
               wavesurfer.on('pause', function() {
                  playButton.style.display = 'block';
                  pauseButton.style.display = 'none';
               });
            }

            if(document.querySelector(".modal__inner .posts-photo")) {
               const slider = tns({
                  container: '.modal__inner .posts-photo .posts__media [photoset-layout]',
                  items: 1,
                  slideBy: 'page',
                  autoplay: true,
                  controlsText: [
                     '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
                     '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
                  ],
               });
            }
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
   if(document.querySelector(".modal__inner .posts-audio")) {
      const wavesurfer = WaveSurfer.create({
         container: '#waveform',
         waveColor: 'rgba(0,0,0,0.15)',
         progressColor: 'rgba(0,0,0,0.5)'
      });
      wavesurfer.unAll();
   }
});