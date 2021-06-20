// truncate script
let truncate = (element, limit, after) => {
    if (!element || !limit) return;

    let content = element.innerHTML.trim();

    content = content.split(' ').slice(0, limit);
    content = content.join(' ') + (after ? after : '');

    element.innerHTML = content;
};

const container__slider = document.querySelector(".wrapper__featured--slider");

for (let k = 0; k < 8; k++) {
    const post = tumblr_api_read.posts[k];

    const caption = post["photo-caption"];
    const body = post["regular-body"];
    const date = post["date"];

    const img = post["photo-url-1280"];

    const question = post["question"];
    const quote = post["quote-text"];
    const quote_source = post["quote-source"];

    const chat = post["conversation-text"];
    const album = post["id3-album"];
    const artist = post["id3-artist"];
    const title_album = post["id3-title"];

    const url = post["url"];
    const type = post["type"];

    const card = document.createElement("div");
    card.className = 'card';

    if (type === "photo") {
        card.innerHTML = `
        <article class="slider">
            <figure class="slider__image">
                <img src="${img}" alt="">
                <figcaption class="slider__caption">
                    <div>${caption}</div>
                    <div class="slider__date">
                      Posted on <a href="${url}">${date.substring(0, 16)}</a>
                    </div>
                </figcaption>
            </figure>
        </article>
        `;
        truncate(card.querySelector('.slider__caption div'), 8, '...');

    } else if (type === "regular") {
        card.innerHTML = `
        <article class="slider">
            <div class="slider__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                    <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                </svg>
            </div>
            <div class="slider__body">
                ${body.substring(0, 190)}...
            </div>
        </article>
        `;
    } else if (type === "answer") {
        card.innerHTML = `
        <article class="slider answer">
            <div class="slider__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <div class="slider__question">
                ${question.substring(0, 86)}...
            </div>
        </article>
        `;
    } else if (type === "quote") {
        card.innerHTML = `
        <article class="slider quote">
            <div class="slider__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <div class="slider__quote">
                ${quote.substring(0, 86)}...
                <div class="slider__quote--source">
                    ${quote_source}
                </div>
            </div>
        </article>
        `;
    } else if (type === "conversation") {
        card.innerHTML = `
        <article class="slider chat">
            <a href="${url}">
            <div class="slider__icon is-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </div>
            </a>
        </article>
        `;
    } else if (type === "audio") {
        card.innerHTML = `
        <article class="slider audio">
            <a href="${url}">
            <div class="slider__icon is-center is-center-top">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
            </div>
            <div class="slider__audio">
                <h4>${artist}</h4>
                <p>${title_album}</p>
                <p>${album}</p>
            </div>
            </a>
        </article>
        `;
    }

    // const tumblr_blog = document.querySelectorAll(".slider__caption > div .tumblr_blog");
    // if (tumblr_blog) {
    //     for (let j = 0; j < tumblr_blog.length; j++) {
    //         const username = tumblr_blog[j].innerText;

    //         tumblr_blog[j].insertAdjacentHTML('beforebegin', `<img class="tumblr_blog_img" src="https://api.tumblr.com/v2/blog/${username}.tumblr.com/avatar/512">`);
    //         tumblr_blog[j].parentNode.lastChild.remove();
    //     }
    // }
    container__slider.appendChild(card);
}

const slider = tns({
    container: ".wrapper__featured--slider",
    slideBy: "page",
    loop: false,
    autoplay: false,
    nav: false,
    gutter: 30,
    controlsContainer: "#customize-controls",
    "responsive": {
        "350": {
            "items": 1,
            "controls": true,
            "edgePadding": 0
        },
        "900": {
            "controls": true,
            "items": 1,
            edgePadding: 0,
            gutter: 40
        }
    },
});