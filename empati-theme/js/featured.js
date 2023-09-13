/**
 * Function that displays featured posts in a slideshow format.
 * @param {Object} data - The data containing featured posts.
 * @property {number} data["posts-start"] - The starting index of featured posts.
 * @property {number} data["posts-total"] - The total number of featured posts.
 * @property {Object[]} data.posts - An array of featured posts.
*/

const featured = (data) => {
    const container = document.querySelector(
      ".nav__additional__featured .slideshow-all"
    );
  
    // truncate script
    /**
     * Truncates the inner content of an HTML element and adds ellipsis if needed.
     * @param {Element} element - The HTML element to truncate.
     * @param {number} limit - The maximum number of words to display.
     * @param {string} [after] - The text to add after truncation (e.g., ellipsis).
    */
    let truncate = (element, limit, after) => {
      if (!element || !limit) return;
  
      let content = element.innerHTML.trim();
  
      content = content.split(" ").slice(0, limit);
      content = content.join(" ") + (after ? after : "");
  
      element.innerHTML = content;
    };
  
    // https://codepen.io/kenjiroart/pen/qBmONJ
    /**
     * Wraps the inner content of an HTML element with a new wrapper element.
     * @param {Element} parent - The parent element containing the content to wrap.
     * @param {string|Element} wrapper - The HTML element or tag name to use as the new wrapper.
     * @param {string} attribute - The attribute to set on the new wrapper element.
     * @param {string} attributevalue - The value of the attribute to set on the new wrapper element.
     */
    function wrapInner(parent, wrapper, attribute, attributevalue) {
      if (typeof wrapper === "string") {
        wrapper = document.createElement(wrapper);
      }
      var div = parent
        .appendChild(wrapper)
        .setAttribute(attribute, attributevalue);
  
      while (parent.firstChild !== wrapper) {
        wrapper.appendChild(parent.firstChild);
      }
    }
  
    if (typeof container != "undefined" && container != null) {
      const postStart = data["posts-start"];
      const postTotal = data["posts-total"];
  
      for (let k = postStart; k < postTotal; k++) {
        const post = data.posts[k];
  
        // console.log(post);
  
        if (post) {
          const regular = post["regular-body"];
          const url = post["url"];
          const type = post["type"];
          const photo = post["photo-url-1280"];
          const question = post["question"];
          const answer = post["answer"];
  
          const quote = post["quote-text"];
          const quote_source = post["quote-source"];
  
          const root_name = post["reblogged-root-name"];
          const root_avatar = post["reblogged_root_avatar_url_96"];
  
          const original_name =  post["tumblelog"]["name"];
          const original_avatar = post["tumblelog"]["avatar_url_96"];
  
          const date = post["date"].substring(0, 16);
  
          const card = document.createElement("div");
          card.className = "slideshow-item";
          if (type === "regular") {
            card.innerHTML = `
              <div class="slideshow__item">
                  <div class="slideshow__item__inner">
                    <div class="slideshow__item__inner-content">
                      ${regular}
                    </div>
                  </div>
              </div>`;
  
            const captions = card.querySelectorAll(".slideshow__item__inner");
            captions.forEach((caption) => {
              // Check if blockquote is an actual blockquote
              const blockquotes = caption.querySelectorAll("blockquote");
  
              blockquotes.forEach((blockquote) => {
                const tumblrBlogLink =
                  blockquote.previousElementSibling.querySelector(".tumblr_blog");
  
                if (tumblrBlogLink !== null) {
                  blockquote.classList.add("trail-item");
                }
              });
  
              // Script that does the actual un-nesting
              const tumblrParents = caption.querySelectorAll(".trail-item");
              tumblrParents.forEach((tumblrParent) => {
                // Records the link html of the blogger making the blockquote
                const linkName =
                  tumblrParent.parentElement.querySelector(
                    "a.tumblr_blog"
                  ).innerHTML;
  
                // // Adds the link inside the html of the blockquote
                tumblrParent.insertAdjacentHTML(
                  "afterbegin",
                  `<span class="trail-item-username"><img src="http://api.tumblr.com/v2/blog/${linkName}/avatar/30" class="trail-item-avatar"/>${linkName}</span>`
                );
  
                // Un-nests blockquotes
                tumblrParent
                  .closest(".slideshow__item__inner")
                  .insertBefore(
                    tumblrParent,
                    tumblrParent.closest(".slideshow__item__inner").firstChild
                  );
  
                const tumblrBlogLink = tumblrParent?.querySelector(".trail-item-username")?.nextElementSibling?.querySelector( "a.tumblr_blog")?.parentElement;
  
                if (tumblrBlogLink) {
                  tumblrBlogLink.classList.add("d-none");
                }
              });
              const captionInner = caption.querySelector(".slideshow__item__inner-content");
              if (captionInner) {
                caption.appendChild(captionInner);
              }
            });
  
            const npfElementLink = card?.querySelector(".npf_link");
            const npfElementVideo = card?.querySelector('.tmblr-full > video');
            const npfImage = card?.querySelector('.slideshow__item__inner > blockquote:first-of-type .npf_row');
            const npfRow = card?.querySelector('.npf_row');
            const npfPhotoset = card?.querySelector('.npf_photoset');
            const npfAudio = card?.querySelector('.slideshow__item__inner > blockquote:first-of-type .tmblr-full > .audio-caption');
  
            // Get all elements with class "npf_row"
            const npfRows = card.querySelectorAll('.npf_row');
  
            // Find the index of the first ".npf_row" element
            const firstNpfRowIndex = Array.from(npfRows).findIndex(row => row.classList.contains('npf_row'));
  
            // Check if the first ".npf_row" element exists and is not the last element
            if (firstNpfRowIndex !== -1 && firstNpfRowIndex < npfRows.length - 1) {
              // Find and remove the next sibling of the first ".npf_row" element
              const elementToRemove = npfRows[firstNpfRowIndex + 1];
              if (elementToRemove) {
                elementToRemove.remove();
              }
            } else {
              console.log("There are no or only one '.npf_row' elements to remove.");
            }
  
            if(npfRow) {
              npfRow.classList.add("npf_row-modified");
              npfRow.classList.remove("npf_row");
            }
  
            if(npfPhotoset) {
              npfPhotoset.classList.add("npf_photoset-modified");
              npfPhotoset.classList.remove("npf_photoset");
            }
  
            if(npfImage) {
              npfImage.parentElement.parentElement.classList.add("npf-image");
            }
  
            if(npfAudio) {
              npfAudio.parentElement.parentElement.parentElement.classList.add("npf-audio");
              npfAudio.parentElement.classList.add('npf-audio-inner');
              npfAudio.parentElement.classList.remove('tmblr-full');
              npfAudio.parentElement.querySelector('audio').remove();
  
              const title = npfAudio?.querySelector(".title")?.textContent.trim();
              const artist = npfAudio?.querySelector(".artist")?.textContent.trim();
              const album = npfAudio?.querySelector(".album")?.textContent.trim();
              const albumCover = npfAudio
                ?.querySelector(".album-cover")
                ?.getAttribute("src");
  
              // console.log({ title, artist, album, albumCover });
  
              const playBtn = '<i class="las la-play"></i>';
              npfAudio.insertAdjacentHTML("afterbegin", playBtn);
            }
  
            if(npfElementVideo) {
              npfElementVideo.parentElement.classList.add("npf_video");
              npfElementVideo.parentElement.classList.remove("tmblr-full");
  
              const npfData = JSON.parse(npfElementVideo.parentElement.getAttribute("data-npf"));
              const { poster } = npfData;
              const markup = `
                <div class="npf-video-block" style="background-image:url('${poster[0].url}')">
                  <i class="las la-play"></i>
                </div>
              `;
              npfElementVideo.parentElement.innerHTML = markup;
              npfElementVideo.remove();
            }
  
            if (npfElementLink) {
              
              // For some reason, Tumblr doesn't provide the URL image of the poster????
              // Tried to generate it manually but failed 
              /**
               * Generates the URL for the poster image based on media_key, width, height, and type.
               * @param {string} mediaKey - The media_key for the poster image.
               * @param {number} width - The width of the poster image.
               * @param {number} height - The height of the poster image.
               * @param {string} type - The type of the poster image (e.g., "image/png").
               * @returns {string} The URL of the poster image.
               */
              function generatePosterURL(mediaKey, width, height, type) {
                const hash = mediaKey.split(":")[0];
                const fileExtension = type.split("/")[1];
                const posterURL = `https://64.media.tumblr.com/${hash}/${mediaKey}/s${width}x${height}.${fileExtension}`;
                return posterURL;
              }
  
              /*
              Correct: https://64.media.tumblr.com/4ac351cb9b6285e05b30d310859ab9d3/84a77bf1080b2e6e-0f/s1280x1920/74e2ba144b58575f49b0f4d6ee2d970bb1432c11.png
  
              Incorrect: https://64.media.tumblr.com/4ac351cb9b6285e05b30d310859ab9d3/1200x600/4ac351cb9b6285e05b30d310859ab9d3:84a77bf1080b2e6e-0f.png
              */
              
              const npfData = JSON.parse(npfElementLink.getAttribute("data-npf"));
              const { display_url, title, site_name, poster } = npfData;
              const posterUrl = poster && poster[0] && poster[0].media_key ? generatePosterURL(poster[0].media_key, poster[0].width, poster[0].height, poster[0].type) : "";
              
              const markup = `
                <div class="npf-link-block ${
                  poster ? "has-poster" : "has-no-poster"
                }">
                  <a target="_blank" href="${display_url}">
                    <div class="poster" style="background-image:url(${posterUrl})">
                      <div class="title">${title}</div>
                    </div>
                    <div class="bottom">
                      <div class="description">
                        ${title}
                      </div>
                      <div class="site-name">
                        ${site_name}
                      </div>
                    </div>
                  </a>
                </div>
              `;
              
              npfElementLink.innerHTML = markup;
            }
            
            wrapInner(card, "a", "href", `${url}`);
          } else if (type === "photo") {
            card.innerHTML = `<div class="slideshow__item">
                  <a href="${url}">
                    <figure class="is-photo" >
                        <img src="${photo}" alt="">
                    </figure>
                  </a>
                  <div class="slideshow__item__source">
                    <div class="slideshow__item__source-username">
                      <img src="${root_avatar ? root_avatar : original_avatar}" alt="${root_name ? root_name : original_name}">
                      <span>${root_name ? root_name : original_name}</span>
                    </div>
                  </div>
              </div>
              `;
  
            wrapInner(card, "a", "href", `${url}`);
          } else if (type === "answer") {
            card.innerHTML = `<div class="slideshow__item">
                      <div class="slideshow__item__question">
                          <a href="${url}">
                              <span class="slideshow__item__question-icon" aria-hidden="true"><i class="las la-question-circle"></i></span>
                              ${question.substring(0, 100)}...
                          </a>
                      </div>
                  </div>
              `;
          } else if (type === "quote") {
            card.innerHTML = `<div class="slideshow__item">
                      <div class="slideshow__item__quote">
                          <a href="${url}">
                              <span class="slideshow__item__quote-icon" aria-hidden="true"><i class="las la-quote-left"></i></span>
                              ${quote.substring(0, 100)}...
                              <div class="slideshow__item__quote-source">${quote_source}</div>
                          </a>
                      </div>
                  </div>
              `;
          } else if(type === "video") {
            // Idk if the legacy post for the video still exists so just returns a console instead for now
            console.log("Video...");
          } else {
            return;
          }
          
          container.appendChild(card);
        }
      }
    }
  };
  