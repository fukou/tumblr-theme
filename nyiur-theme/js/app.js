var app = {
  init: function () {
    // app.infiniteScroll();
    app.postPhotosets();
    // app.postSoundCloud();
    // app.postSpotify();
    // app.postBandCamp();
    app.checkPhotoNPF();
    // app.npfToLegacy();
    app.tinySlider();
    app.loadTabs();
    // app.postNPF();
    app.shortenPost();
    //   app.postTags();
    app.postNPFAudio();
  },
  infiniteScroll: () => {
    const isPaginationExist = document.querySelector(".pagination");

    if (typeof isPaginationExist != "undefined" && isPaginationExist != null) {
      const elem = document.querySelector(
        ".wrapper__blog__inner.is-infinite-scroll"
      );
      const infScroll = new InfiniteScroll(elem, {
        // options
        hideNav: ".pagination",
        path: ".pagination__inner a.is-next",
        append: ".wrapper__blog__article",
        status: ".page-load-status",
        button: ".view-more-button",
        // load pages on button click
        scrollThreshold: false,
        history: false,
      });

      infScroll.on("append", function (response, path, items) {
        console.log(items.length + " items appended");
        console.log(path);

        let itemsID = Array.from(items).map((event) => {
          return event.getAttribute("id");
        });

        Tumblr.LikeButton.get_status_by_post_ids(itemsID);
        app.masonry();
        app.postPhotosets();
        app.postSoundCloud();
        app.postSpotify();
        app.postBandCamp();
        app.checkPhotoNPF();
        app.npfToLegacy();
        app.shortenPost();
        app.postTags();
      });
    }
  },
  postNPF: () => {
    const npfOptions = {
      includeCommonPhotosets: false,
      photosetMargins: "0",
    };
    npfPhotosets(".posts", npfOptions);
  },
  postPhotosets: () => {
    initPhotosets();
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
  checkPhotoNPF: () => {
    const isTextPost = document.querySelectorAll(".posts");
    isTextPost.forEach(function (item, idx) {
      const containsPhotosets = item.querySelector(".photoset-grid");
      const containsPhoto = item.querySelector(
        ".reblog-list figure.tmblr-full:first-of-type"
      );

      if (containsPhotosets) {
        item.classList.add("posts-photoset-text");
      } else if (containsPhoto) {
        item.classList.add("posts-photo-text");
      }
    });
  },
  npfToLegacy: () => {
    document
      .querySelectorAll(".posts-photo-text")
      .forEach(function (item, idx) {
        const npfPhotosets = item.querySelector(
          ".posts__body .reblog-list:first-of-type > .npf_photoset"
        );
        const npfPhoto = item.querySelector(
          ".posts__body .reblog-list:first-of-type > figure.tmblr-full"
        );
        if (npfPhotosets) {
          const p = npfPhotosets.cloneNode(true);

          let containerPhotosets = item.querySelector(".posts__media");
          containerPhotosets.append(p);

          npfPhotosets.parentElement.remove();
        } else if (npfPhoto) {
          const q = npfPhoto.cloneNode(true);

          let containerPhoto = item.querySelector(".posts__media");
          containerPhoto.append(q);

          npfPhoto.parentElement.remove();
        }
      });
  },
  tinySlider: () => {
    var container = ".slideshow";
    if (typeof container != "undefined" && container != null) {
      document.querySelectorAll(container).forEach((slider) => {
        var slider1 = slider;
        var sliderMode = slider1.getAttribute("data-mode")
          ? slider1.getAttribute("data-mode")
          : "carousel";
        var sliderAxis = slider1.getAttribute("data-axis")
          ? slider1.getAttribute("data-axis")
          : "horizontal";
        var sliderSpace = slider1.getAttribute("data-gutter")
          ? slider1.getAttribute("data-gutter")
          : 30;
        var sliderEdge = slider1.getAttribute("data-edge")
          ? slider1.getAttribute("data-edge")
          : 0;

        var sliderItems = slider1.getAttribute("data-items")
          ? slider1.getAttribute("data-items")
          : 4; //option: number (items in all device)
        var sliderItemsXl = slider1.getAttribute("data-items-xl")
          ? slider1.getAttribute("data-items-xl")
          : Number(sliderItems); //option: number (items in 1200 to end )
        var sliderItemsLg = slider1.getAttribute("data-items-lg")
          ? slider1.getAttribute("data-items-lg")
          : Number(sliderItemsXl); //option: number (items in 992 to 1199 )
        var sliderItemsMd = slider1.getAttribute("data-items-md")
          ? slider1.getAttribute("data-items-md")
          : Number(sliderItemsLg); //option: number (items in 768 to 991 )
        var sliderItemsSm = slider1.getAttribute("data-items-sm")
          ? slider1.getAttribute("data-items-sm")
          : Number(sliderItemsMd); //option: number (items in 576 to 767 )
        var sliderItemsXs = slider1.getAttribute("data-items-xs")
          ? slider1.getAttribute("data-items-xs")
          : Number(sliderItemsSm); //option: number (items in start to 575 )

        var sliderSpeed = slider1.getAttribute("data-speed")
          ? slider1.getAttribute("data-speed")
          : 500;
        var sliderautoWidth = slider1.getAttribute("data-autowidth") === "true"; //option: true or false
        var sliderArrow = slider1.getAttribute("data-arrow") !== "false"; //option: true or false
        var sliderDots = slider1.getAttribute("data-dots") !== "false"; //option: true or false

        var sliderAutoPlay = slider1.getAttribute("data-autoplay") !== "false"; //option: true or false
        var sliderAutoPlayTime = slider1.getAttribute("data-autoplaytime")
          ? slider1.getAttribute("data-autoplaytime")
          : 4000;
        var sliderHoverPause =
          slider1.getAttribute("data-hoverpause") === "true"; //option: true or false
        var sliderLoop = slider1.getAttribute("data-loop") !== "false"; //option: true or false
        var sliderRewind = slider1.getAttribute("data-rewind") === "true"; //option: true or false
        var sliderAutoHeight =
          slider1.getAttribute("data-autoheight") === "true"; //option: true or false
        var sliderfixedWidth =
          slider1.getAttribute("data-fixedwidth") === "true"; //option: true or false
        var sliderTouch = slider1.getAttribute("data-touch") !== "false"; //option: true or false
        var sliderDrag = slider1.getAttribute("data-drag") !== "false"; //option: true or false
        var sliderBy = slider1.getAttribute("data-slide-by")
          ? slider1.getAttribute("data-slide-by")
          : "page";
        var silderControlsContainer = slider1.getAttribute(
          "data-controls-container"
        )
          ? slider1.getAttribute("data-controls-container")
          : "";

        // Check if document DIR is RTL
        var ifRtl = document
          .getElementsByTagName("html")[0]
          .getAttribute("dir");
        var sliderDirection;
        if (ifRtl === "rtl") {
          sliderDirection = "rtl";
        }
        var tnsSlider = tns({
          container: slider,
          mode: sliderMode,
          axis: sliderAxis,
          gutter: sliderSpace,
          edgePadding: sliderEdge,
          speed: sliderSpeed,
          autoWidth: sliderautoWidth,
          controls: sliderArrow,
          nav: sliderDots,
          autoplay: sliderAutoPlay,
          autoplayTimeout: sliderAutoPlayTime,
          autoplayHoverPause: sliderHoverPause,
          autoplayButton: false,
          autoplayButtonOutput: false,
          controlsPosition: top,
          navPosition: top,
          autoplayPosition: top,
          controlsContainer: silderControlsContainer,
          controlsText: [
            '<i class="las la-angle-left"></i>',
            '<i class="las la-angle-right"></i>',
          ],
          loop: sliderLoop,
          rewind: sliderRewind,
          autoHeight: sliderAutoHeight,
          fixedWidth: sliderfixedWidth,
          touch: sliderTouch,
          mouseDrag: sliderDrag,
          arrowKeys: true,
          items: sliderItems,
          textDirection: sliderDirection,
          responsive: {
            0: {
              items: Number(sliderItemsXs),
            },
            576: {
              items: Number(sliderItemsSm),
              slideBy: "page",
            },
            768: {
              items: Number(sliderItemsMd),
              slideBy: "page",
            },
            992: {
              items: Number(sliderItemsLg),
              slideBy: "page",
            },
            1200: {
              items: Number(sliderItemsXl),
              slideBy: sliderBy,
            },
          },
        });
      });
    }
  },
  loadTabs: () => {
    const isTabsExist = document.querySelector("[data-tabs");
    if (typeof isTabsExist != "undefined" && isTabsExist != null) {
      const tabs = new Tabby("[data-tabs]");
    }
  },
  shortenPost: () => {
    if (document.querySelector('body[data-blog-style="grid"]')) {
      document
        .querySelectorAll("article.posts:not(.posts-photo)")
        .forEach(function (post) {
          const elementsToCheck = [
            {
              element: post.querySelector(".posts__body"),
              className: "is-truncated",
            },
            {
              element: post.querySelector(".posts__media"),
              className: "is-truncated",
            },
          ];

          elementsToCheck.forEach(({ element, className }) => {
            if (element && element.clientHeight >= 300) {
              element.classList.add(className);

              const toggleBtn = document.createElement("a");
              const toggleLink = post
                .querySelector(".posts__dated__perma a")
                .getAttribute("href");

              toggleBtn.className = "is-toggle btn btn__primary";
              toggleBtn.textContent = "View full post";
              toggleBtn.href = toggleLink;

              element.append(toggleBtn);
            }
          });
        });
    }
  },
  postTags: () => {
    let allTags = document.querySelectorAll(".posts__bottom");
    let isTagListShown = false; // Flag variable to track visibility state

    allTags.forEach((item, idx) => {
      const tagButton = item.querySelector(".posts__bottom__tags-btn");
      const tagList = item.querySelector(".posts__bottom__tags > ul");

      tagButton?.addEventListener("click", function (e) {
        e.preventDefault();
        this.classList.toggle("is-active");
        tagList.classList.toggle("is-shown");

        // Check if the tag list is shown before triggering layout recalculation
        if (tagList.classList.contains("is-shown")) {
          // Recalculate Masonry layout after a small delay
          setTimeout(() => {
            app.msnry.layout(); // Use app.msnry here
          }, 100);
          isTagListShown = true;
        } else {
          isTagListShown = false;
          app.msnry.layout();
        }
      });
    });

    // Listen for transitionend event on the tag list
    // and trigger layout recalculation after a small delay
    document.addEventListener("transitionend", function (event) {
      const target = event.target;
      if (target.classList.contains("posts__bottom__tags") && !isTagListShown) {
        // Recalculate Masonry layout after a small delay
        setTimeout(() => {
          app.msnry.layout(); // Use app.msnry here
        }, 100);
      } else {
        app.msnry.layout();
      }
    });
  },
  postNPFAudio: () => {
    const posts = document.querySelectorAll(".posts");

    posts.forEach((post, index) => {
      const postAudio = post?.querySelector("figcaption.audio-caption");
      postAudio?.parentElement.classList.add("tmblr-npf-audio");
      postAudio?.parentElement.classList.remove("tmblr-full");

      const audioDetails = postAudio?.querySelector(".tmblr-audio-meta");

      const title = audioDetails?.querySelector(".title")?.textContent.trim();
      const artist = audioDetails?.querySelector(".artist")?.textContent.trim();
      const album = audioDetails?.querySelector(".album")?.textContent.trim();
      const albumCover = postAudio
        ?.querySelector(".album-cover")
        ?.getAttribute("src");

      postAudio?.classList.add("d-none");

      if (title || artist || album || albumCover) {
        const postAudioElement = document.createElement("section");
        postAudioElement.className = "posts__audio-npf";

        const elements = [
          {
            selector: ".title",
            className: "posts__audio-npf__title",
            textContent: title,
          },
          {
            selector: ".artist",
            className: "posts__audio-npf__artist",
            textContent: artist,
          },
          {
            selector: ".album",
            className: "posts__audio-npf__album",
            textContent: album,
          },
        ];

        const coverElement = document.createElement("div");
        coverElement.className = "posts__audio-npf__cover";

        if (albumCover) {
          const imgElement = document.createElement("img");
          imgElement.src = albumCover;
          imgElement.alt = "";
          coverElement.appendChild(imgElement);
        } else {
          const placeholderElement = document.createElement("div");
          placeholderElement.className = "album-placeholder";
          placeholderElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="15.5" r="2.5"/><path d="M8 17V5l12-2v12"/></svg>`;
          coverElement.appendChild(placeholderElement);
        }

        const audioMoreDetails = document.createElement("div");
        audioMoreDetails.className = "posts__audio-npf__details";

        elements.forEach(({ selector, className, textContent }) => {
          if (textContent) {
            const element = document.createElement(
              selector.startsWith(".") ? "div" : selector
            );
            element.className = className;
            element.textContent = textContent;
            audioMoreDetails.appendChild(element);
          }
        });

        const playButton = document.createElement("button");
        playButton.className = "posts__audio-npf__button";
        playButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    `;

        const audioElement = postAudio?.parentElement.querySelector("audio");
        if (audioElement) {
          audioElement.style.display = "none";

          // Play audio when the play button is clicked
          playButton.addEventListener("click", () => {
            if (audioElement.paused || audioElement.ended) {
              audioElement.play();
              playButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        `;
            } else {
              audioElement.pause();
              playButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        `;
            }
          });

          // Update play button state based on audio events
          audioElement.addEventListener("play", () => {
            playButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
      `;
          });

          audioElement.addEventListener("pause", () => {
            playButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      `;
          });

          audioElement.addEventListener("ended", () => {
            playButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      `;
          });
        }

        audioMoreDetails.prepend(playButton);
        postAudioElement.append(...[audioMoreDetails, coverElement]);
        postAudio.parentElement.appendChild(postAudioElement);
        if (audioElement) {
          // Add progress bar for audio playback
          const progressBar = document.createElement("div");
          progressBar.className = "posts__audio-npf__progress-bar";
          const progressFill = document.createElement("div");
          progressFill.className = "posts__audio-npf__progress-fill";
          progressBar.appendChild(progressFill);

          progressBar.addEventListener("click", (event) => {
            const progressBarRect = progressBar.getBoundingClientRect();
            const clickX = event.clientX - progressBarRect.left;
            const progressBarWidth = progressBarRect.width;
            const progressPercentage = clickX / progressBarWidth;
            audioElement.currentTime =
              audioElement.duration * progressPercentage;
          });

          audioElement.addEventListener("timeupdate", () => {
            const progress =
              (audioElement.currentTime / audioElement.duration) * 100;
            progressFill.style.width = `${progress}%`;
          });
          audioMoreDetails.appendChild(progressBar);
        }
      }
    });
  },
};

document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
