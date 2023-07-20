const featured = (data) => {
  const container = document.querySelector(
    ".wrapper__featured__slideshow .slideshow-all"
  );

  // truncate script
  let truncate = (element, limit, after) => {
    if (!element || !limit) return;

    let content = element.innerHTML.trim();

    content = content.split(" ").slice(0, limit);
    content = content.join(" ") + (after ? after : "");

    element.innerHTML = content;
  };

  // https://codepen.io/kenjiroart/pen/qBmONJ
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

              const tumblrBlogLink = tumblrParent
                ?.querySelector(".trail-item-username")
                ?.nextElementSibling?.querySelector(
                  "a.tumblr_blog"
                )?.parentElement;
              if (tumblrBlogLink) {
                tumblrBlogLink.classList.add("d-none");
              }
            });
            const captionInner = caption.querySelector(
              ".slideshow__item__inner-content"
            );
            if (captionInner) {
              caption.appendChild(captionInner);
            }
          });

          // truncate(card.querySelector(".slideshow__item__inner"), 40, "...");

          const npfElement = card?.querySelector(".npf_link");
          if (npfElement) {
            const npfData = JSON.parse(npfElement.getAttribute("data-npf"));
            console.log(npfData);
            const { display_url, title, site_name, poster } = npfData;
            const posterUrl =
              poster && poster[0] && poster[0].media_key
                ? `https://static.tumblr.com/${poster[0].media_key}`
                : "";

            const markup = `
              <div class="npf-link-block ${
                poster ? "has-poster" : "has-no-poster"
              }">
                <a target="_blank" href="${display_url}">
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
            npfElement.innerHTML = markup;
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
                    <img src="${root_avatar}" alt="${root_name}">
                    <span>${root_name}</span>
                  </div>
                </div>
            </div>
            `;

          // <div class="slideshow__item__source-date">
          //   Posted on ${date}
          // </div>

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
                            <div class="slideshow__item-quote-source">${quote_source}</div>
                        </a>
                    </div>
                </div>
            `;
        } else {
          return;
        }

        container.appendChild(card);
      }
    }
  }
};
