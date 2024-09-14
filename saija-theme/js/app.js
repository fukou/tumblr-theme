/**
 * @version 1.0.0
 * @author fukuo <github.com/fukou>
 * @website https://fukuo.site
 */
var app = {
    /**
     * Initialize the application.
     * @function
     */
    currentIndex: 0,
    init: function () {
        app.sparkingEffect();
        // app.postSoundCloud();
        // app.postSpotify();
        // app.postBandCamp();
        app.postNormalizeLegacy();
        app.categorizePosts();
        app.shortenPost();
        app.postNPFAudio();
        app.postNPFData();
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
    postSoundCloud: () => {
        const soundcloudColor = "#de8100";
        const soundcloudPlayers = document.querySelectorAll(
            ".soundcloud_audio_player",
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
        const spotifyPlayers = document.querySelectorAll(
            ".spotify_audio_player",
        );
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
    postNormalizeLegacy() {
        // Select all articles with the class 'posts'
        const posts = document.querySelectorAll("article.posts");

        posts.forEach((post) => {
            // Find the .posts-trail-legacy and .trail-content elements within the post
            const legacy = post.querySelector(".posts-trail-legacy");
            const trailContent = post.querySelector(".posts-trail-content");

            // Check if both .posts-trail-legacy and .trail-content exist
            if (legacy && trailContent) {
                // Move the content of legacy to the beginning of trail-content
                trailContent.insertAdjacentElement("afterbegin", legacy);
            }
        });
    },
    categorizePosts: () => {
        // Select all the post elements inside .posts-trail-content
        const posts = document.querySelectorAll(".posts-trail-content");

        // Loop through each post
        posts.forEach((post) => {
            const article = post.closest("article"); // Get the parent article element

            // Get relevant elements for checking conditions
            const firstParagraph = post.querySelector("p");
            const h2 = post.querySelector("h2");
            const h1 = post.querySelector("h1");
            const postsTrailLegacy = post.querySelector(".posts-trail-legacy");
            const npfRow = post.querySelector(".npf_row");
            const npfPhotoset = post.querySelector(".npf_photoset");
            const pollPost = post.querySelector(".poll-post");

            // Check if .posts-trail-legacy is empty and followed by npf_row or npf_photoset
            const postsTrailLegacyEmptyFollowedByNpf =
                postsTrailLegacy &&
                postsTrailLegacy.textContent.trim() === "" && // Empty .posts-trail-legacy
                (npfRow || npfPhotoset); // Followed by .npf_row or .npf_photoset

            // Check if .posts-trail-legacy is followed by an empty paragraph, <h1>, and .npf_row
            const postsTrailLegacyFollowedByEmptyPAndH1AndNpfRow =
                postsTrailLegacy &&
                postsTrailLegacy.textContent.trim() === "" && // Empty .posts-trail-legacy
                firstParagraph &&
                firstParagraph.textContent.trim() === "" && // Empty <p>
                h1 && // <h1> exists
                npfRow; // Followed by .npf_row

            // Check if .posts-trail-legacy is followed by an empty paragraph, and then a poll post (or other div content)
            const postsTrailLegacyFollowedByEmptyPAndH1AndPoll =
                postsTrailLegacy &&
                postsTrailLegacy.textContent.trim() === "" && // Empty .posts-trail-legacy
                firstParagraph &&
                firstParagraph.textContent.trim() === "" && // Empty <p>
                !h1 && // No <h1> this time
                pollPost; // Followed by poll post (or another div that is not npf_row, npf_photoset, etc.)

            // Check if .posts-trail-legacy has an <h1> and no other meaningful content (only <h1>)
            const postsTrailLegacyOnlyH1 =
                postsTrailLegacy &&
                postsTrailLegacy.children.length === 1 && // Ensure there is only one child
                postsTrailLegacy.querySelector("h1") !== null; // That child is an <h1>

            // Check if .posts-trail-legacy is not empty by checking for any child elements or text content
            const postsTrailLegacyHasContent =
                postsTrailLegacy &&
                (postsTrailLegacy.children.length > 0 ||
                    postsTrailLegacy.textContent.trim().length > 0);

            // Check if the first element is an empty paragraph followed by an <h2>
            const condition1 =
                firstParagraph && !firstParagraph.textContent.trim() && h2;

            // Check if the first element is a paragraph with text content
            const condition2 =
                firstParagraph && firstParagraph.textContent.trim().length > 0;

            // Check if there is an empty `.posts-trail-legacy` followed by an empty paragraph and an <h1>
            const condition3 =
                postsTrailLegacy &&
                postsTrailLegacy.textContent.trim() === "" &&
                firstParagraph &&
                !firstParagraph.textContent.trim() &&
                h1;

            // If .posts-trail-legacy has content but it's only an <h1>, allow adding the class
            if (
                (postsTrailLegacyHasContent && !postsTrailLegacyOnlyH1) ||
                postsTrailLegacyEmptyFollowedByNpf
            ) {
                // Allow adding class only if the new conditions are met
                if (
                    postsTrailLegacyFollowedByEmptyPAndH1AndNpfRow ||
                    postsTrailLegacyFollowedByEmptyPAndH1AndPoll
                ) {
                    article.classList.add("posts-text");
                } else {
                    return; // Skip this post
                }
            }

            // Add .posts-text class if any of the conditions are met
            if (
                condition1 ||
                condition2 ||
                condition3 ||
                postsTrailLegacyOnlyH1 ||
                postsTrailLegacyFollowedByEmptyPAndH1AndNpfRow || // New condition added
                postsTrailLegacyFollowedByEmptyPAndH1AndPoll // New condition added
            ) {
                article.classList.add("posts-text");
            }
        });
    },
    shortenPost: () => {
        if (document.querySelector("body.is-shorten-long-post")) {
            document
                .querySelectorAll("article[class*='long_post']")
                .forEach(function (post) {
                    let postBody = post.querySelector(".posts-trail-content");

                    if (postBody != null && postBody.clientHeight >= 700) {
                        postBody.classList.add("is-truncated");

                        const toggleBtn = document.createElement("a");
                        toggleBtn.className = "posts-trail-toggle is-toggle";
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
    postNPFAudio: () => {
        const posts = document.querySelectorAll(".posts");

        posts.forEach((post) => {
            const postAudio = post?.querySelector("figcaption.audio-caption");
            const audioParent = postAudio?.parentElement;
            if (!audioParent) return;

            audioParent.classList.add("tmblr-npf-audio");
            audioParent.classList.remove("tmblr-full");

            const audioDetails = postAudio?.querySelector(".tmblr-audio-meta");
            const audioInfo = {
                title: audioDetails
                    ?.querySelector(".title")
                    ?.textContent.trim(),
                artist: audioDetails
                    ?.querySelector(".artist")
                    ?.textContent.trim(),
                album: audioDetails
                    ?.querySelector(".album")
                    ?.textContent.trim(),
                albumCover: postAudio
                    ?.querySelector(".album-cover")
                    ?.getAttribute("src"),
            };

            postAudio?.classList.add("d-none");

            if (Object.values(audioInfo).some((info) => info)) {
                const postAudioElement = document.createElement("section");
                postAudioElement.className = "posts__audio-npf";

                const coverElement = createCoverElement(audioInfo.albumCover);
                const audioMoreDetails = createAudioDetailsElement(audioInfo);

                const playButton = createPlayButton(
                    audioParent.querySelector("audio"),
                );

                if (playButton) {
                    audioMoreDetails.prepend(playButton);
                    const progressBar = createProgressBar(
                        playButton.audioElement,
                    );
                    if (progressBar) {
                        audioMoreDetails.appendChild(progressBar);
                    }
                }

                postAudioElement.append(audioMoreDetails, coverElement);
                audioParent.appendChild(postAudioElement);
            }
        });

        function createCoverElement(albumCover) {
            const coverElement = document.createElement("div");
            coverElement.className = "posts__audio-npf__cover";

            if (albumCover) {
                const imgElement = document.createElement("img");
                imgElement.src = albumCover;
                imgElement.alt = "";
                coverElement.appendChild(imgElement);
            } else {
                const placeholder = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="15.5" r="2.5"/><path d="M8 17V5l12-2v12"/></svg>`;
                coverElement.innerHTML = `<div class="album-placeholder">${placeholder}</div>`;
            }

            return coverElement;
        }

        function createAudioDetailsElement({ title, artist, album }) {
            // Create the wrapper for the audio info
            const audioInfoWrapper = document.createElement("div");
            audioInfoWrapper.className = "posts__audio-npf-info";

            const audioMoreDetails = document.createElement("div");
            audioMoreDetails.className = "posts__audio-npf__details";

            // Append the info elements (title, artist, album) inside the wrapper
            [
                { className: "posts__audio-npf__title", textContent: title },
                { className: "posts__audio-npf__artist", textContent: artist },
                { className: "posts__audio-npf__album", textContent: album },
            ].forEach(({ className, textContent }) => {
                if (textContent) {
                    const element = document.createElement("div");
                    element.className = className;
                    element.textContent = textContent;
                    audioInfoWrapper.appendChild(element); // Append to the wrapper
                }
            });

            // Append the wrapper to the main audio details div
            audioMoreDetails.appendChild(audioInfoWrapper);

            return audioMoreDetails;
        }

        function createPlayButton(audioElement) {
            if (!audioElement) return null;

            const playButton = document.createElement("button");
            playButton.className = "posts__audio-npf__button";
            updatePlayButtonIcon(audioElement.paused, playButton);

            playButton.addEventListener("click", () => {
                if (audioElement.paused || audioElement.ended) {
                    audioElement.play();
                } else {
                    audioElement.pause();
                }
                updatePlayButtonIcon(audioElement.paused, playButton);
            });

            audioElement.addEventListener("play", () =>
                updatePlayButtonIcon(false, playButton),
            );
            audioElement.addEventListener("pause", () =>
                updatePlayButtonIcon(true, playButton),
            );
            audioElement.addEventListener("ended", () =>
                updatePlayButtonIcon(true, playButton),
            );

            playButton.audioElement = audioElement;
            return playButton;
        }

        function updatePlayButtonIcon(isPaused, button) {
            button.innerHTML = isPaused
                ? `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
        }

        function createProgressBar(audioElement) {
            const progressBar = document.createElement("div");
            progressBar.className = "posts__audio-npf__progress-bar";

            const progressFill = document.createElement("div");
            progressFill.className = "posts__audio-npf__progress-bar-fill";
            progressBar.appendChild(progressFill);

            // Seek when clicking on the progress bar
            progressBar.addEventListener("click", (event) => {
                const rect = progressBar.getBoundingClientRect();
                const clickX = event.clientX - rect.left;
                const percentage = clickX / rect.width;
                audioElement.currentTime = audioElement.duration * percentage;
            });

            // Update progress as audio plays
            audioElement.addEventListener("timeupdate", () => {
                if (audioElement.duration) {
                    const progress =
                        (audioElement.currentTime / audioElement.duration) *
                        100;
                    progressFill.style.width = `${progress}%`;
                }
            });

            // Reset progress when audio ends
            audioElement.addEventListener("ended", () => {
                progressFill.style.width = "0%";
            });

            return progressBar;
        }
    },
    postNPFData: () => {
        document.querySelectorAll(".posts").forEach((post, postsIndex) => {
            const postNPF = post.getAttribute("data-article-npf");
            const jsonString = app.extractJSONString(postNPF);
            const decodedJsonString = app.decodeAndReplace(jsonString);

            try {
                const npfData = JSON.parse(decodedJsonString);
                // console.log(
                //     "%cPosts:",
                //     "background: #00aaaa; color: white",
                //     npfData,
                // );

                // Handle reblogged posts (trail)
                if (npfData.trail) {
                    const postsTrailList =
                        post.querySelectorAll(".posts-trail-item");

                    postsTrailList.forEach((postsTrail, index) => {
                        const trail = npfData.trail[index];
                        console.log("%cTrail:", "background: #de8110; color: white", trail);

                        let postsTrailAsk = trail?.layout.find(
                            (layout) => layout.type === "ask",
                        );

                        console.log( "%cPosts:",
                          "background: #00ccaa; color: white", index);

                        let blog = trail?.blog;
                        let blogTheme = blog?.theme || {};
                        let badges = blog?.tumblrmart_accessories?.badges;

                        app.insertBlogProfile(
                            postsTrail,
                            postsTrailAsk,
                            blog,
                            blogTheme,
                        );
                        app.insertBadges(postsTrail, blog, badges);

                        if (trail.content) {
                            trail.content.forEach((content) => {
                                app.handleTrailContent(postsTrail, content);
                            });
                        }
                    });
                }

                // Handle original posts (content)
                if (npfData.content) {
                    const postsTrailOriginal = post.querySelectorAll(
                        ".posts-trail-original",
                    );
                    postsTrailOriginal.forEach((postsOriginal) => {
                        npfData.content.forEach((content) => {
                            app.handleTrailContent(postsOriginal, content);
                        });
                    });
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        });
    },
    handleTrailContent: (postsTrail, content) => {
        switch (content.type) {
            case "image":
                if (content.attribution) {
                    app.appendAttribution(postsTrail, content.attribution);
                }
                break;
            case "poll":
                app.appendPollInfo(postsTrail, content);
                break;
            default:
                // Handle other content types
                break;
        }
    },
    appendAttribution: (postsTrail, attribution) => {
      const { type, url } = attribution;
      const formattedUrl = app.getDomainFromUrl(url);
  
      if (type === "link") {
          const npfRows = postsTrail.querySelectorAll(".npf_row");
          const npfRowCount = npfRows.length;
  
          // If there are no npf_rows, exit the function
          if (npfRowCount === 0) {
              return;
          }
  
          // Determine which npf_row to show the attribution on
          npfRows.forEach((npfRow, index) => {
              if (index === app.currentIndex) {
                  npfRow.querySelectorAll(".npf_col").forEach((npfCol) => {
                      const figureTmblr = npfCol.querySelector(".tmblr-full");
                      if (figureTmblr) {
                          // Create a new attribution text
                          const attributionText = document.createElement("div");
                          attributionText.className = "attribution-block";
                          attributionText.innerHTML = `<a href="${url}" target="_blank" data-attribution-type="${type}">${formattedUrl} <svg id="managed-icon__caret-fat" fill="currentColor" viewBox="0 0 13 20.1"><path d="M0 2.9l7.2 7.2-7.1 7.1L3 20.1l7.1-7.1 2.9-2.9L2.9 0 0 2.9"></path></svg></a>`;
  
                          // Append the new attribution text to the figure
                          figureTmblr.append(attributionText);
                      }
                  });
              }
          });
  
          // Update index to point to the next attribution link
          app.currentIndex = (app.currentIndex + 1) % npfRowCount;
      }
    },
    appendPollInfo: (postsTrail, pollContent) => {
        const currentTime = Date.now() / 1000; // Current time in seconds
        const expireTime = pollContent.timestamp; // Poll creation time (in seconds)
        const expireAfter = pollContent.settings.expire_after; // Expiration duration (in seconds)
        const endTime = expireTime + expireAfter; // Exact end time in seconds

        const isPollFinished = currentTime > endTime; // Check if the poll has finished

        // Convert epoch timestamps to regular date strings
        const formattedDate = app.convertEpochToRegularDate(expireTime);
        const formattedExpired = app.convertEpochToRegularDate(endTime);

        const pollInfo = document.createElement("div");
        pollInfo.className = "poll-post-date";

        if (isPollFinished) {
            pollInfo.innerHTML = `<span class="poll-post-finished">This poll has ended on <b>${app.formatDate(
                formattedExpired,
            )}</b></span>`;
            postsTrail
                .querySelector(".poll-post")
                .classList.add("poll-posts-finished");
        } else {
            pollInfo.innerHTML = `<span class="poll-post-date__started"><b>Poll started on</b> ${app.formatDate(
                formattedDate,
            )}</span><span class="poll-post-date__ends"><b>Poll will end on</b> ${app.formatDate(
                formattedExpired,
            )}</span>`;
        }

        postsTrail.querySelector(".poll-post").append(pollInfo);
    },
    insertBlogProfile: (postsTrail, postsTrailAsk, blog, theme) => {
      let { description: blogDesc, title: blogTitle } = blog;
      let { title_color: blogTitleColor, background_color: blogBgColor } = theme;
  
      if (!blog) return;
  
      // Check if blog profile already exists
      if (postsTrail.querySelector(".posts-trail-profile")) return;
  
      const blogInfo = `
        <div class="posts-trail-profile">
            <h3>${blogTitle}</h3>
            <p>${blogDesc}</p>
        </div>
      `;
  
      if (!postsTrailAsk) {
          postsTrail.style.setProperty("--trail-profile-bg", blogBgColor);
          postsTrail.style.setProperty("--trail-profile-color", blogTitleColor);
  
          const trailUsernameElement = postsTrail.querySelector(".posts-trail-username");
          if (trailUsernameElement) {
              trailUsernameElement.insertAdjacentHTML("beforeend", blogInfo);
          }
      }
    },
    insertBadges: (postsTrail, blog, badges) => {
        if (blog?.can_show_badges && badges) {
            let postBadges = postsTrail.querySelector(".posts-trail-badges");

            if (!postBadges) {
                postBadges = document.createElement("span");
                postBadges.className = "posts-trail-badges";
                app.insertAfter(
                    postBadges,
                    postsTrail.querySelector(".posts-trail-blog .username"),
                );
            }

            badges[0].urls.forEach((badge, idx) => {
                const badgeElement = document.createElement("img");
                badgeElement.src = badge;
                const badgeItem = document.createElement("span");
                badgeItem.className = "posts-trail-badges-item";
                badgeItem.append(badgeElement);
                postBadges.append(badgeItem);

                if (idx > 6) {
                    postBadges.classList.add("posts-trail-badges-huge");
                }
            });
        }
    },
    insertAfter(newNode, existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    },
    getDomainFromUrl(url) {
      const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/;
      const match = url.match(regex);
      return match ? match[1] : null;
    },
    decodeAndReplace(input) {
        try {
            return input
                .replace(/\\x22/g, '"')
                .replace(/\\x3c/g, "<")
                .replace(/\\x3e/g, ">")
                .replace(/\\x26amp;/g, "&")
                .replace(/\\x26/g, "&")
                .replace(/\\"/g, '"')
                .replace(/\\'/g, "'")
                .replace(/\\\\/g, "\\");
        } catch (error) {
            console.error("Error while decoding and replacing:", error);
            return input; // Return the original input in case of an error
        }
    },
    extractJSONString(input) {
        const jsonStartIndex = input?.indexOf("'") + 1;
        const jsonEndIndex = input?.lastIndexOf("'");
        return input?.substring(jsonStartIndex, jsonEndIndex);
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
