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
    app.headerScroll();
    app.headerActions();
    app.buttonToggleLayout();
    app.checkBlogLayout();
    app.postPopup();
    app.postToggleButton();
    // app.postNPF();
    app.postSoundCloud();
    app.postSpotify();
    app.postBandCamp();
    app.postNPFAudio();
    app.postNPFData();
    app.checkPhotoNPF();
    app.shortenPost();
    app.sparkingEffect();
    app.masonry();
  },
  headerScroll: () => {
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
  },
  headerActions: () => {
    // Usage for the hamburger menu
    app.toggleMenu(
      'button[data-button-type="hamburger"]',
      ".nav__navigations",
      "hamburger"
    );

    // Usage for the search menu
    app.toggleMenu(
      'button[data-button-type="search"]',
      ".nav__search",
      "search"
    );

    // Usage for the additional menu
    app.toggleMenu(
      'button[data-button-type="info"]',
      ".nav__additional",
      "additional"
    );
  },
  toggleMenu: (buttonSelector, menuSelector, menuType) => {
    const btn = document.querySelector(buttonSelector);
    const menu = document.querySelector(menuSelector);

    btn.addEventListener("click", () => {
      menu.classList.toggle("is-shown");
      btn.classList.toggle("is-activated");
      document.body.classList.toggle("is-menu-clicked");

      if (menuType === "hamburger") {
        btn.nextElementSibling.classList.toggle("is-disabled");
        btn.nextElementSibling.nextElementSibling.classList.toggle(
          "is-disabled"
        );
      } else if (menuType === "search") {
        btn.previousElementSibling.classList.toggle("is-disabled");
        btn.nextElementSibling.classList.toggle("is-disabled");
      } else if (menuType === "additional") {
        btn.previousElementSibling.classList.toggle("is-disabled");
        btn.previousElementSibling.previousElementSibling.classList.toggle(
          "is-disabled"
        );
      }

      const isAriaHidden = menu.getAttribute("aria-hidden");
      menu.setAttribute(
        "aria-hidden",
        isAriaHidden === "true" ? "false" : "true"
      );

      btn.innerHTML = !menu.classList.contains("is-shown")
        ? menuType === "hamburger"
          ? `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`
          : menuType === "search"
          ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`
          : menuType === "additional"
          ? ` <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`
          : ""
        : menuType === "hamburger"
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : menuType === "search"
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : menuType === "additional"
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : "";
    });
  },
  buttonToggleLayout: () => {
    // Select the buttons and body element
    const gridButton = document.querySelector(".grid");
    const listButton = document.querySelector(".list");
    const body = document.body;

    // Function to handle button click
    const handleButtonClick = (style) => {
      body.setAttribute("data-blog-style", style);
      gridButton.classList.toggle("activated", style === "grid");
      listButton.classList.toggle("activated", style === "list");
    };

    // Check the initial state of data-blog-style and set the button accordingly
    const initialStyle = body.getAttribute("data-blog-style");
    handleButtonClick(initialStyle);

    // Add click event listeners to the buttons
    gridButton.addEventListener("click", () => handleButtonClick("grid"));
    listButton.addEventListener("click", () => handleButtonClick("list"));
  },
  checkBlogLayout: () => {
    const checkLayout = document.body;
    const cards = document.querySelectorAll(".posts");

    // Check if the current layout is "grid"
    if (checkLayout.getAttribute("data-blog-style") === "grid") {
      cards.forEach(function (card) {
        const npfElementVideo = card?.querySelector(".tmblr-full > video");
        if (npfElementVideo) {
          npfElementVideo.parentElement.classList.add("npf_video");
          npfElementVideo.parentElement.classList.remove("tmblr-full");

          const npfData = JSON.parse(
            npfElementVideo.parentElement.getAttribute("data-npf")
          );
          const { poster } = npfData;
          const markup = `
            <div class="npf-video-block" style="background-image:url('${poster[0].url}')">
              <i class="las la-play"></i>
            </div>
          `;
          npfElementVideo.insertAdjacentHTML("afterend", markup);
        }
      });
    } else {
      return;
    }
  },
  postPopup: () => {
    // Function to create a modal for a post
    function createPostModal(postId, postContent) {
      const modalId = `modal-post-${postId}`;
      const modal = document.createElement("div");
      modal.className = "modal micromodal-slide";
      modal.id = modalId;
      modal.innerHTML = `
            <button class="modal__close" aria-label="Close modal" data-micromodal-close><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> <span>Close</span> </button>
            <div class="modal__overlay" tabindex="-1" data-micromodal-close>
                <div class="modal__container" role="dialog" aria-modal="true">
                    <main class="modal__content">
                        ${postContent}
                    </main>
                </div>
            </div>
        `;
      document.body.appendChild(modal);
    }

    // Function to load more notes via AJAX
    async function loadNotesViaAjax(postContent, modalId) {
      const nextNotesURL = postContent.getAttribute("data-article-notes");
      const postNotes = document.createElement("div");
      postNotes.className = "posts__ajax-notes";
    
      if (nextNotesURL) {
        try {
          const response = await fetch(nextNotesURL);
          if (response.status >= 200 && response.status < 300) {
            const notesHtml = await response.text();
            postNotes.innerHTML = notesHtml;
    
            // Append the notes inside the modal's content element
            const modalContent = document.querySelector(`#${modalId} .modal__content`);
            if (modalContent) {
              modalContent.appendChild(postNotes);
            } else {
              console.error("Modal content element not found");
            }
          } else {
            console.error("Error loading more notes");
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    }

    // Event delegation to handle post clicks
    document.querySelectorAll(".posts").forEach((post) => {
      const postTrigger = document.createElement("div");
      postTrigger.className = "posts__view";
      postTrigger.innerHTML = `<span class="posts__view__trigger">View post <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg></span>`;
    
      post.append(postTrigger);
      // Add this click event listener inside your forEach loop
      document.querySelectorAll(".posts").forEach((post) => {
        const postTrigger = document.createElement("div");
        postTrigger.className = "posts__view";
        postTrigger.innerHTML = `<span class="posts__view__trigger">View post <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg></span>`;
      
        post.append(postTrigger);
        // Add this click event listener inside your forEach loop
        postTrigger.addEventListener("click", (e) => {
          const postId = post.getAttribute("data-article-id");
          const postElement = postTrigger.closest(".posts");
          const postPermalink = post.getAttribute("data-article-permalink");
      
          if (postId && postElement && postPermalink) {
            // Store the original URL
            const originalURL = window.location.href;
      
            // Construct the new URL by appending the relative URL
            const baseURL = window.location.origin;
            const newURL = `${baseURL}/post/${postId}`;
      
            // Use window.history.replaceState() to change the URL
            window.history.replaceState("", "", newURL);
      
            const postContent = post.outerHTML; // Clone the entire post content
      
            // Create the modal and set its content
            createPostModal(postId, postContent);
      
            // Open the modal by specifying the target modal ID
            MicroModal.show(`modal-post-${postId}`, {
              awaitCloseAnimation: true,
              awaitOpenAnimation: true,
              disableScroll: true,
              debugMode: true,
              onClose: (modal) => {
                // Sets a timer for 1000 milliseconds before the modal is removed from DOM
                setTimeout(() => {
                  modal.remove();
                  // Restore the original URL after closing the modal
                  window.history.replaceState("", "", originalURL);
                }, 1000);
              },
            });
      
            // Load notes via AJAX after the modal is created
            loadNotesViaAjax(postElement, `modal-post-${postId}`);
          }
        });
      });      
    });
  },
  postToggleButton: () => {
    const buttonLink = document.querySelectorAll(
      ".posts__dated__toggle button"
    );
    buttonLink.forEach(function (button, index) {
      document.addEventListener("click", function (event) {
        var isClickInside = button.contains(event.target);

        if (isClickInside) {
          if (button.nextElementSibling) {
            button.nextElementSibling.classList.toggle("is-shown");
          }
        } else {
          button.nextElementSibling.classList.remove("is-shown");
        }
      });
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
              for (let i = 0; i < trail.content.length; i++) {
                const trailContent = trail.content[i];
                switch (trailContent.type) {
                  case "poll":
                    // console.log(trailContent.created_at);
                    const formattedDate = app.formatDate(
                      trailContent.created_at
                    );
                    const timestampDate = app.convertEpochToRegularDate(
                      trailContent.timestamp
                    );
                    const expiredAfterDate = app.convertEpochToRegularDate(
                      trailContent.timestamp +
                        trailContent.settings.expire_after
                    );

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
  checkPhotoNPF: () => {
    const isTextPost = document.querySelectorAll(".posts");
    isTextPost.forEach(function (item, idx) {
      const containsPhotosets = item.querySelector(".npf_photoset");
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
  sparkingEffect: () => {
    // https://renerehme.dev/blog/animated-sparkles-in-jquery
    const color = "#e37738";
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
      document.querySelector(".wrapper__blog").prepend(loadingMessage);

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
        const loadingMessageContainer = document.querySelector(".grid-loader");
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
  decodeAndReplace(input) {
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
  insertAfter(newNode, existingNode) {
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
