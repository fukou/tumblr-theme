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
    app.tinySlider();
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
      "hamburger",
      `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`
    );

    // Usage for the search menu
    app.toggleMenu(
      'button[data-button-type="search"]',
      ".nav__search",
      "search",
      `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`
    );

    // Usage for the additional menu
    app.toggleMenu(
      'button[data-button-type="info"]',
      ".nav__additional",
      "additional",
      `<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="19" height="19"><path d="M4.9 8.7l-.3-.4-.8.6.3.4.8-.6zm6 .6l.3-.4-.8-.6-.3.4.8.6zM7.5 14A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zM14 7.5A6.5 6.5 0 017.5 14v1A7.5 7.5 0 0015 7.5h-1zM7.5 1A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zm0-1A7.5 7.5 0 000 7.5h1A6.5 6.5 0 017.5 1V0zM4 6h1V5H4v1zm6 0h1V5h-1v1zm.1 2.7a3.25 3.25 0 01-5.2 0l-.8.6c1.7 2.267 5.1 2.267 6.8 0l-.8-.6z" fill="currentColor"></path></svg>`
    );
  },
  toggleMenu: (buttonSelector, menuSelector, menuType, iconDefault) => {
    const btn = document.querySelector(buttonSelector);
    const menu = document.querySelector(menuSelector);
    const overlay = document.createElement("div");
    overlay.className = "nav__overlay";
  
    btn.addEventListener("click", () => {
      if (menu.classList.contains("is-shown")) {
        // Close the menu
        closeMenu();
      } else {
        // Open the menu
        openMenu();
      }
    });
  
    function openMenu() {
      menu.classList.add("is-shown");
      btn.classList.add("is-activated");
      document.body.classList.add("is-menu-clicked");
      document.body.appendChild(overlay);
  
      // Trap focus within the menu
      const focusableElements = menu.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
  
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];
  
      menu.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.keyCode === 9) {
          // Handle Tab key press
          if (e.shiftKey) {
            // Shift + Tab, move focus to the last element
            if (document.activeElement === firstFocusableElement) {
              e.preventDefault();
              lastFocusableElement.focus();
            }
          } else {
            // Tab, move focus to the first element
            if (document.activeElement === lastFocusableElement) {
              e.preventDefault();
              firstFocusableElement.focus();
            }
          }
        }
      });

      if (menuType === "hamburger") {
        toggleDisabledClass(btn, [
          btn.nextElementSibling,
          btn.nextElementSibling.nextElementSibling
        ]);
      } else if (menuType === "search") {
        toggleDisabledClass(btn, [
          btn.previousElementSibling,
          btn.nextElementSibling
        ]);
      } else if (menuType === "additional") {
        toggleDisabledClass(btn, [
          btn.previousElementSibling,
          btn.previousElementSibling.previousElementSibling
        ]);
      }
      
      // Focus the first element within the menu
      firstFocusableElement.focus();

      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      menu.setAttribute("aria-hidden", "false");
  
      // Handle click on the overlay to close the menu
      overlay.addEventListener("click", closeMenu);
    }
  
    function closeMenu() {
      menu.classList.remove("is-shown");
      btn.classList.remove("is-activated");
      document.body.classList.remove("is-menu-clicked");
      document.body.removeChild(overlay);

      btn.innerHTML = `${iconDefault}`;
      menu.setAttribute("aria-hidden", "true");

      // Use the function to toggle disabled classes
      if (menuType === "hamburger") {
        toggleDisabledClass(btn, [
          btn.nextElementSibling,
          btn.nextElementSibling.nextElementSibling
        ]);
      } else if (menuType === "search") {
        toggleDisabledClass(btn, [
          btn.previousElementSibling,
          btn.nextElementSibling
        ]);
      } else if (menuType === "additional") {
        toggleDisabledClass(btn, [
          btn.previousElementSibling,
          btn.previousElementSibling.previousElementSibling
        ]);
      }
  
      // Restore focus to the button
      btn.focus();
    }

    function toggleDisabledClass(btn, elementsToToggle) {
      elementsToToggle.forEach(element => {
        element.classList.toggle("is-disabled");
      });
    }
  },
  buttonToggleLayout: () => {
    // Select the buttons and body element
    const gridButton = document.querySelector(".grid");
    const listButton = document.querySelector(".list");
    const body = document.body;

    // Function to handle button click
    const handleButtonClick = (style) => {
      body.setAttribute("data-blog-style", style);
      gridButton?.classList.toggle("activated", style === "grid");
      listButton?.classList.toggle("activated", style === "list");
    };

    // Check the initial state of data-blog-style and set the button accordingly
    const initialStyle = body.getAttribute("data-blog-style");
    handleButtonClick(initialStyle);

    // Add click event listeners to the buttons
    gridButton?.addEventListener("click", () => handleButtonClick("grid"));
    listButton?.addEventListener("click", () => handleButtonClick("list"));
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
          card.insertAdjacentHTML("afterbegin", markup);
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
      const postTrigger = post.querySelector('.posts__view');
      
      // Add this click event listener inside your forEach loop
      postTrigger?.addEventListener("click", (e) => {
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
              // Restore the original URL after closing the modal
              window.history.replaceState("", "", originalURL);
              // Sets a timer for 1000 milliseconds before the modal is removed from DOM
              setTimeout(() => {
                modal.remove();
              }, 1000);
            },
          });
    
          // Load notes via AJAX after the modal is created
          loadNotesViaAjax(postElement, `modal-post-${postId}`);
        }
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

      postAudio?.closest(".posts").classList.add("posts-audio");

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
        console.log('%cPost Trail:', 'background: #00aaaa; color: white', postsTrail);

        if (npfData.trail) {
          const postsTrailList = post.querySelectorAll(".reblog-list"); // Get all .reblog-list elements within the current .posts element

          postsTrailList.forEach((postsTrail, index) => {
            let trail = npfData.trail[index];
            let trailAskLayout = trail?.layout.find(
              (layout) => layout.type === "ask"
            );
            let blog = trail?.blog;
            let blogTheme = blog?.theme;
            let badgesAcc = blog?.tumblrmart_accessories;
            let badges = blog?.tumblrmart_accessories?.badges;

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
    const posts = document.querySelectorAll(".posts");
  
    posts.forEach((post) => {
      const originalContent = post.querySelector(".original");
      const reblogContent = post.querySelector(".reblog-list:first-child");
      const headingContent = post.querySelector(".posts__media > h1");
  
      const containsPhotosets = (originalContent && originalContent.querySelector(".npf_row:first-child")) || (reblogContent && reblogContent.querySelector(".npf_row:first-child"));
      const containsPhoto = (originalContent && originalContent.querySelector("figure.tmblr-full:first-of-type")) || (reblogContent && reblogContent.querySelector("figure.tmblr-full:first-of-type"));
  
      if (containsPhotosets) {
        post.classList.add("posts-photoset-text");
        headingContent ? headingContent.parentElement.classList.add("is-not-displayed") : "";
      } else if (containsPhoto) {
        post.classList.add("posts-photo-text");
        headingContent ? headingContent.parentElement.classList.add("is-not-displayed") : "";
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
