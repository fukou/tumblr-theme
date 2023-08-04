/**
 * @version 1.0.0
 * @author fukuo <github.com/fukou>
 * @website https://fukuo.site
 */
var app = {
  /** @type {Masonry} */
  msnry: null,
  /**
   * Initialize the application.
   * @function
   */
  init: function () {
    app.headerToggleMenu();
    app.headerToggleDarkMode();
    app.headerSuggestion();
    app.postSoundCloud();
    app.postSpotify();
    app.postBandCamp();
    app.checkPhotoNPF();
    // app.npfToLegacy();
    app.masonry();
    app.tinySlider();
    app.loadTabs();
    app.postNPF();
    app.shortenPost();
    app.postTags();
    app.postNPFAudio();
    app.postNPFData();
    app.TOC();
    app.sparkingEffect();
  },
  headerToggleMenu: () => {
    const btn = document.querySelector(".btn-nav");
    const hiddenLink = document.querySelector(".nav__additional");
    btn.addEventListener("click", () => {
      btn.classList.toggle("is-actived");
      hiddenLink.classList.toggle("is-shown");
      document.querySelector("body").classList.toggle("is-pushed");
    });
  },
  headerToggleDarkMode: () => {
    const btn_mode = document.querySelector(".btn-dark");
    const htmlElement = document.documentElement;

    const toggleColorMode = () => {
      // Check if the current mode is dark or not
      const isDarkMode =
        htmlElement.getAttribute("data-force-color-mode") === "dark";

      // Toggle the mode and update localStorage
      if (isDarkMode) {
        htmlElement.setAttribute("data-force-color-mode", "light");
        localStorage.setItem("color-mode", "light");

        btn_mode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path></svg>`;
      } else {
        htmlElement.setAttribute("data-force-color-mode", "dark");
        localStorage.setItem("color-mode", "dark");
        btn_mode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      }
    };

    btn_mode.addEventListener("click", toggleColorMode);
    btn_mode.innerHTML =
      colorModeOverride === "dark"
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path></svg>`;
  },
  headerSuggestion: () => {
    const elementSearch = document.querySelector(".nav__search");
    const inputSearch = document.getElementById("search");
    const suggestionBox = document.querySelector(".nav__search__suggestion");

    elementSearch.addEventListener("mousedown", () => {
      inputSearch.focus();
    });

    elementSearch.addEventListener("mouseup", () => {
      suggestionBox.style.display = "block";
    });

    document.addEventListener("mouseup", (event) => {
      if (!elementSearch.contains(event.target)) {
        suggestionBox.style.display = "none";
      }
    });
  },
  postNPF: () => {
    const npfOptions = {
      includeCommonPhotosets: true,
      useTumblrLightbox: true,
      photosetMargins: "7.5",
    };
    npfPhotosets(".posts", npfOptions);
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
  masonry: () => {
    // masonry
    const elem = document.querySelector(
      "body[data-blog-style='masonry'] .wrapper__blog"
    );
    if (typeof elem != "undefined" && elem != null) {
      // Show the loading message before initializing Masonry
      const loadingMessage = document.createElement("div");
      loadingMessage.classList.add("grid-loader");
      loadingMessage.textContent = "Loading posts...";
      document.querySelector('.wrapper__blog').prepend(loadingMessage);

      app.msnry = new Masonry(elem, {
        // options
        itemSelector: "article.posts",
        columnWidth: ".grid-sizer",
        horizontalOrder: true,
        gutter: 30,
        percentPosition: true,
      });
      imagesLoaded(elem).on("progress", function () {
        // layout Masonry after each image loads
        app.msnry.layout(); // Use app.msnry here
      });
      imagesLoaded(elem).on("done", function () {
        const loadingMessageContainer = document.querySelector('.grid-loader');
        if (loadingMessageContainer) {
          loadingMessageContainer.remove();
        }
        // Apply the fade-in animation to the article.posts elements one by one with a slight delay
        const posts = document.querySelectorAll("article.posts");
        posts.forEach((post, index) => {
          setTimeout(() => {
            post.classList.add("load");
          }, index * 250); // Adjust the delay time as needed (here it's 100ms per post)
        });
      });
    }
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
    if (document.querySelector("body.is-shorten-long-post")) {
      document
        .querySelectorAll("article[class*='long_post']")
        .forEach(function (post) {
          let postBody = post.querySelector(".posts__body");

          if (postBody != null && postBody.clientHeight >= 700) {
            postBody.classList.add("is-truncated");

            const toggleBtn = document.createElement("a");
            toggleBtn.className = "is-toggle btn btn__primary";
            toggleBtn.textContent = "Expand";
            toggleBtn.href = "#";

            postBody.append(toggleBtn);

            toggleBtn.addEventListener("click", function (e) {
              e.preventDefault();
              postBody.classList.remove("is-truncated");
              postBody.classList.add("is-truncated--full");

              this.remove();
            });
          }
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
  postNPFData: () => {
    // Loop through all elements with class "posts" and decode their content
    document.querySelectorAll(".posts").forEach((post) => {
      // Get the JSON string from the element's text content
      const postNPF = post.getAttribute("data-article-npf");
      // const postID = post.getAttribute("data-article-id");

      // Extract the JSON string from the attribute value
      const jsonString = app.extractJSONString(postNPF);
      // Replace escaped characters in the JSON string
      const decodedJsonString = app.decodeAndReplace(jsonString);

      try {
        // Parse the JSON string as an object
        const npfData = JSON.parse(decodedJsonString);
        // console.log(npfData);
        console.log("%cPost:", "background: #00aaaa; color: white", {
          npfData,
        });

        if (npfData.trail) {
          const postsTrailList = post.querySelectorAll(".reblog-list"); // Get all .reblog-list elements within the current .posts element

          postsTrailList.forEach((postsTrail, index) => {
            let trail = npfData.trail[index];
            let trailAskLayout = trail?.layout.find(
              (layout) => layout.type === "ask"
            );
            let blog = trail.blog;
            let blogTheme = blog.theme;
            let badgesAcc = blog.tumblrmart_accessories;
            let badges = blog.tumblrmart_accessories?.badges;

            let {
              description: blogDesc,
              title: blogTitle,
              name: blogName,
            } = blog;
            let {
              link_color: blogLinkColor,
              title_font: blogTitleFont,
              title_color: blogTitleColor,
              background_color: blogBgColor,
              header_image_scaled: headerImage,
              avatar_shape: avatarShape,
            } = blogTheme;
            let blogInfo;

            console.log("%cPost Badges:", "background: #555; color: yellow", {
              badgesAcc,
            });

            /*
            If blog has a profile info, including: avatar, header image, font and colors
            */
            if (blog) {
              blogInfo = document.createElement("div");
              blogInfo.className = "reblog-post-description d-none";

              blogInfo.innerHTML = `<div class="reblog-post-description__header" style="background-image:url(${headerImage}); background-size:cover; background-position:center; min-height:135px;"></div>
                                  <img src="https://api.tumblr.com/v2/blog/${blogName}/avatar/64" alt="${blogName}" class="reblog-post-description__avatar ${avatarShape}">
                                  <h3 style="font-family:${blogTitleFont};">${blogTitle} (@${blogName})</h3> 
                                  <p>${blogDesc}</p>
                                 `;

              blogInfo.style.setProperty("--link-color", blogLinkColor);
              blogInfo.style.setProperty("--background-color", blogBgColor);
              blogInfo.style.setProperty("--title-color", blogTitleColor);

              app.insertAfter(
                blogInfo,
                postsTrail.querySelector(".reblog-post-avatar")
              );
            }

            /*
            If the blog contains a custom badges
            */

            if (blog.can_show_badges && badges) {
              //   console.log('%cPost Trail:', 'background: #00aaaa; color: white', postsTrail);

              // Check if .reblog-post-badges already exists for this .reblog-list
              let postBadges = postsTrail.querySelector(".reblog-post-badges");
              if (!postBadges) {
                postBadges = document.createElement("span");
                postBadges.className = "reblog-post-badges";
                app.insertAfter(
                  postBadges,
                  postsTrail.querySelector(".reblog-post-avatar-name")
                );
              }

              let badgeElement, badgeItem;
              badges[0].urls.forEach((badge, idx) => {
                badgeElement = document.createElement("img");
                badgeElement.src = badge;
                badgeItem = document.createElement("span");
                badgeItem.className = "reblog-post-badges-item";

                badgeItem.append(badgeElement);
                postBadges.append(badgeItem);

                if (idx > 6) {
                  postBadges.classList.add("reblog-post-badges-huge");
                }
              });
            }

            if (trail.content) {
              // console.log(trail.content);
              for (let i = 0; i < trail.content.length; i++) {
                const trailContent = trail.content[i];
                switch (trailContent.type) {
                  case "poll":
                    // console.log(trailContent.created_at);
                    const formattedDate = app.formatDate(trailContent.created_at);
                    const timestampDate = app.convertEpochToRegularDate(
                      trailContent.timestamp
                    );
                    const expiredAfterDate = app.convertEpochToRegularDate(trailContent.timestamp + trailContent.settings.expire_after);

                    const formattedExpired = app.formatDate(expiredAfterDate);

                    let pollInfo;
                    pollInfo = document.createElement("div");
                    pollInfo.className = "poll-post-date";
                    pollInfo.innerHTML = `<span class="poll-post-date__started"><b>Poll started on</b> ${formattedDate}</span>
                                                  <span class="poll-post-date__ended"><b>Poll ended on</b> ${formattedExpired} </span>
                                                  `;
                    postsTrail.querySelector(".poll-post").append(pollInfo);
                    break;
                  case "paywall":
                    let paywallContent;
                    const payWallUsername = trailContent.text.replace(
                      "%s",
                      `<strong>${blogName}</strong>`
                    );
                    paywallContent = document.createElement("div");
                    paywallContent.className = "reblog-list-paywall";
                    paywallContent.innerHTML = `<h2 style="font-family:${blogTitleFont};">${trailContent.title}</h2>
                                                        <p>${payWallUsername}</p>
                                                        <p><a class="btn btn__secondary" href="${trailContent.url}">Show your support!</a>
                                                       `;
                    paywallContent.style.setProperty(
                      "--link-color",
                      blogLinkColor
                    );
                    paywallContent.style.setProperty(
                      "--background-color",
                      blogBgColor
                    );
                    paywallContent.style.setProperty(
                      "--title-color",
                      blogTitleColor
                    );
                    postsTrail.append(paywallContent);
                    paywallContent.previousElementSibling.remove();
                    break;
                  default:
                    "";
                }
              }
            }
          });
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });
  },
  TOC: () => {
    const allPosts = document.querySelectorAll(".posts");
    for (let l = 0; l < allPosts.length; l++) {
      if (allPosts[l].classList.contains("toc")) {
        const isText = document?.querySelector(".toc");
        const bodyText = isText?.querySelector(".posts__body");
        const headingText = bodyText?.querySelectorAll("h2");
        const headingTemplate = `<div class="posts__heading"><h1><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> Table of contents</h1><ul></ul></div>`;
        bodyText.insertAdjacentHTML("afterbegin", headingTemplate);
        const headingContent = document.querySelector(".posts__heading ul");

        for (heading of headingText) {
          heading.id = `${heading.innerText
            .split(" ")
            .join("-")
            .toLowerCase()}`;

          headingContent.insertAdjacentHTML(
            "afterbegin",
            `<li><a href="#${heading.innerText
              .split(" ")
              .join("-")
              .toLowerCase()}">${heading.innerText}</a></li>`
          );
        }
      }
    }
  },
  sparkingEffect: () => {
    // https://renerehme.dev/blog/animated-sparkles-in-jquery
    const color = "#FFC700";
    const svgPath =
      "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";

    // sparkling effect
    let sparkling = function () {
      document.querySelectorAll(".sparkling").forEach(function (item) {
        let sparklingElement = item;
        let stars = sparklingElement.querySelectorAll(".star");

        // remove the first star when more than 6 stars existing
        if (stars.length > 5) {
          stars.forEach(function (star, index) {
            if (index === 0) {
              star.remove();
            }
          });
        }
        // add a new star
        sparklingElement.insertAdjacentHTML("beforeend", addStar());
      });
      let rand = Math.round(Math.random() * 700) + 100;
      setTimeout(sparkling, rand);
    };

    // star
    let addStar = function () {
      let size = Math.floor(Math.random() * 20) + 10;
      let top = Math.floor(Math.random() * 100) - 50;
      let left = Math.floor(Math.random() * 100);

      return (
        '<span class="star" style="top:' +
        top +
        "%; left:" +
        left +
        '%;">' +
        '<svg width="' +
        size +
        '" height="' +
        size +
        '" viewBox="0 0 68 68" fill="none">' +
        '<path d="' +
        svgPath +
        '" fill="' +
        color +
        '" /></svg></span>'
      );
    };

    // execute
    sparkling();
  },
  decodeAndReplace(input){
    return input
      .replace(/\\x22/g, '"')
      .replace(/\\x3c/g, "<")
      .replace(/\\x3e/g, ">")
      .replace(/\\x26amp;/g, "&")
      .replace(/\\x26/g, "&")
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, "\\");
  },
  extractJSONString(input) {
    const jsonStartIndex = input.indexOf("'") + 1;
    const jsonEndIndex = input.lastIndexOf("'");
    return input.substring(jsonStartIndex, jsonEndIndex);
  },
  insertAfter(newNode, existingNode){
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  },
  formatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      // timeZoneName: 'short'
    };

    // Manually parse the date string
    const [datePart, timePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);

    // Create a new Date object
    const dateObject = new Date(year, month - 1, day, hour, minute, second);

    // Check if the dateObject is valid
    if (isNaN(dateObject.getTime())) {
      console.error("Invalid Date:", dateString);
      return "";
    }

    const formattedDate = dateObject.toLocaleString("en-US", options);
    return formattedDate;
  },
  convertEpochToRegularDate(epochTimestamp, includeTimezone = false) {
    const date = new Date(epochTimestamp * 1000);
    const dateString = date.toISOString().slice(0, 19).replace("T", " ");
    return includeTimezone ? dateString + " GMT" : dateString;
  },
};

document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
