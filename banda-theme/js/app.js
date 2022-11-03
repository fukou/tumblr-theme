var app = {
  init: function () {
    app.loadTabs()
    app.loadAudio()
    app.postNPF()
    app.postPhotosets()
    app.postSoundCloud()
    app.postSpotify()
    app.postBandCamp()
    app.postAudio()
    app.masonry()
    app.darkMode()
    app.openMenu()
    app.openSidebar()
    app.shortenPost()
    app.draggable()
    app.checkPhotoNPF()
    app.themeSettings()
  },
  loadTabs: () => {
    if (
      typeof document.querySelector("[data-tabs]") != "undefined" &&
      document.querySelector("[data-tabs]") != null &&
      document.querySelector('body[data-blog-style="notion"]')
    ) {
      const tabs = new Tabby("[data-tabs]");

      const firstTabs = document.querySelector(
        ".wrapper__inner--thumbs__list:first-of-type"
      );
      tabs.toggle(firstTabs);
    }
  },
  loadAudio: () => {
    app.postAudio(".posts");
  },
  postNPF: () => {
    const npfOptions = {
      includeCommonPhotosets: false,
      photosetMargins: "0",
      galleryIndicatorClass: "npf_gallery_indicator",
      galleryIndicatorContent: "<i class='las la-expand'></i>",
    };
    npfPhotosets(".posts", npfOptions);
  },
  postPhotosets: () => {
    initPhotosets()
  },
  postSoundCloud: () => {
    const soundcloudColor = "#de8100";
    const soundcloudPlayers = document.querySelectorAll(
      ".soundcloud_audio_player"
    );

    if (soundcloudPlayers) {
      soundcloudPlayers.forEach(function (s, idx) {
        const url = s.getAttribute("src").split("&")[0];
        const options =
          "&amp;liking=false&amp;sharing=false&amp;auto_play=false&amp;show_comments=false&amp;continuous_play=false&amp;buying=false&amp;show_playcount=false&amp;show_artwork=true&amp;origin=tumblr&amp;color=" +
          soundcloudColor.split("#")[1];
        s.setAttribute("src", url + options);
        s.setAttribute("height", 116);

        s.parentElement.classList.add("is-soundcloud");
      });
    }
  },
  postSpotify: () => {
    const spotifyPlayers = document.querySelectorAll(".spotify_audio_player");
    if (spotifyPlayers) {
      spotifyPlayers.forEach(function (sp, idx) {
        sp.parentElement.classList.add("is-spotify");
      });
    }
  },
  postBandCamp: () => {
    const bandCamp = document.querySelectorAll(".bandcamp_audio_player");
    if (bandCamp) {
      for (b of bandCamp) {
        b.parentElement.classList.add("is-bandcamp");
      }
    }
  },
  postAudio: (element) => {
    let settings = {
      post: element,
    };
    const isAudio = new customAudio(settings);
  },
  masonry: () => {
    // masonry
    let elem = document.querySelector(".wrapper__inner--lists .masonry");
    if (typeof elem != "undefined" && elem != null) {
      let msnry = new Masonry(elem, {
        // options
        itemSelector: "article.posts",
        columnWidth: ".grid-sizer",
        horizontalOrder: true,
        gutter: 30,
        percentPosition: true,
      });
      imagesLoaded(elem).on("progress", function () {
        // layout Masonry after each image loads
        msnry.layout();
      });
    }
  },
  darkMode: () => {
    const btnLight = document.querySelector('button[data-type-button="light"]');
    const btnDark = document.querySelector('button[data-type-button="dark"]');
    const currentTheme = localStorage.getItem("theme");

    let theme;

    if (currentTheme == "dark") {
      document.body.classList.add("dark-theme");
      btnDark.classList.add("is-actived");
      btnLight.classList.remove("is-actived");
    }

    btnDark.addEventListener("click", function () {
      btnDark.classList.add("is-actived");
      btnLight.classList.remove("is-actived");

      theme = "dark";
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", theme);
    });

    btnLight.addEventListener("click", function () {
      btnDark.classList.remove("is-actived");
      btnLight.classList.add("is-actived");

      theme = "light";
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", theme);
    });
  },
  openMenu: () => {
    const btn = document.querySelector(".controls > button");
    const popup = document.querySelector(".wrapper__inner--popup");
    btn.addEventListener("click", function () {
      popup.classList.toggle("is-shown");

      if (popup.classList.contains("is-shown")) {
        this.innerHTML = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L6.75 17.25"></path>
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75L17.25 17.25"></path></svg>`;
        this.nextElementSibling.classList.add("is-disabled");
      } else {
        this.innerHTML = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"></path></svg>`;
        this.nextElementSibling.classList.remove("is-disabled");
      }
    });
  },
  openSidebar: () => {
    const btn = document.querySelector(".controls > .hamburger");
    const sidebar = document.querySelector(".wrapper__sidebar");
    btn.addEventListener("click", function () {
      sidebar.classList.toggle("is-shown");
      document.body.classList.toggle("is-hidden");

      if (sidebar.classList.contains("is-shown")) {
        this.innerHTML = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L6.75 17.25"></path>
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75L17.25 17.25"></path></svg>`;
        this.previousElementSibling.classList.add("is-disabled");
      } else {
        this.innerHTML = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 5.75H19.25"></path>
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 18.25H19.25"></path>
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 12H19.25"></path></svg>`;
        this.previousElementSibling.classList.remove("is-disabled");
      }
    });
  },
  shortenPost: () => {
    const elem = document.querySelector(".wrapper__inner--lists .masonry");
    if (typeof elem != "undefined" && elem != null) {
      document
        .querySelectorAll(
          "article.posts-text:not(.posts-photo-text):not(.posts-photoset-text)"
        )
        .forEach(function (post) {
          let postBody = post.querySelector(".posts__inner");
          if (postBody != null && postBody.clientHeight >= 600) {
            postBody.classList.add("is-truncated");
          }
        });
    }
  },
  draggable: () => {
    interact(".draggable").draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      // modifiers: [
      //   interact.modifiers.restrictRect({
      //     restriction: "parent",
      //     endOnly: false,
      //   }),
      // ],
      // enable autoScroll
      autoScroll: false,

      listeners: {
        // call this function on every dragmove event
        move: dragMoveListener,
        // call this function on every dragend event
      },
    });

    function dragMoveListener(event) {
      var target = event.target;
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      // translate the element
      target.style.transform = "translate(" + x + "px, " + y + "px)";

      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    }

    // this function is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;
  },
  checkPhotoNPF: () => {
    const isTextPost = document.querySelectorAll(
      ".wrapper__inner--lists .posts"
    );
    isTextPost.forEach(function (item, idx) {
      const containsPhotosets = item.querySelector(
        ".posts__inner .photoset-grid"
      );
      const containsPhoto = item.querySelector(
        ".posts__inner .reblog-list figure.tmblr-full:first-of-type"
      );

      if (containsPhotosets) {
        item.classList.add("posts-photoset-text");
      } else if (containsPhoto) {
        item.classList.add("posts-photo-text");
      }
    });
  },
  themeSettings: () => {
    if (
      document.querySelector('body[data-blog-style="simple"]') ||
      document.querySelector('body[data-blog-style="notion"]')
    ) {
      document.querySelectorAll(".posts-main").forEach(function (p) {
        p.querySelector(".posts__view").remove();
      });
    }

    if (document.querySelector('body[data-blog-style="notion"]')) {
      document
        .querySelector(".is-widgets > a")
        .addEventListener("click", function (e) {
          e.preventDefault();
          this.classList.toggle("is-clicked");
          document
            .querySelector(".wrapper__inner--widgets")
            .classList.toggle("is-shown");

          if (this.classList.contains("is-clicked")) {
            this.innerHTML =
              '<svg width="24" height="24" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.75 4.75H15.25C17.4591 4.75 19.25 6.54086 19.25 8.75V15.25C19.25 17.4591 17.4591 19.25 15.25 19.25H8.75C6.54086 19.25 4.75 17.4591 4.75 15.25V8.75C4.75 6.54086 6.54086 4.75 8.75 4.75Z"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.75 12.75C7.75 12.75 9 15.25 12 15.25C15 15.25 16.25 12.75 16.25 12.75"></path><circle cx="14" cy="10" r="1" fill="currentColor"></circle><circle cx="10" cy="10" r="1" fill="currentColor"></circle></svg> Hide widgets';
          } else {
            this.innerHTML =
              '<svg width="24" height="24" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.75 4.75H15.25C17.4591 4.75 19.25 6.54086 19.25 8.75V15.25C19.25 17.4591 17.4591 19.25 15.25 19.25H8.75C6.54086 19.25 4.75 17.4591 4.75 15.25V8.75C4.75 6.54086 6.54086 4.75 8.75 4.75Z"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.75 12.75C7.75 12.75 9 15.25 12 15.25C15 15.25 16.25 12.75 16.25 12.75"></path><circle cx="14" cy="10" r="1" fill="currentColor"></circle><circle cx="10" cy="10" r="1" fill="currentColor"></circle></svg> Show widgets';
          }
        });
    }
  },
}

document.addEventListener("DOMContentLoaded", () => {
  app.init();
})
