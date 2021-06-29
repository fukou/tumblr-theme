// (c) fukuo.tumblr.com | 23/06/2021
const allPosts = document.querySelectorAll(".posts");
for (let l = 0; l < allPosts.length; l++) {
    if (allPosts[l].classList.contains("posts_text")) {
        const isText = document.querySelector(".posts_text");
        const bodyText = isText.querySelector(".posts__body");
        const headingText = bodyText.querySelectorAll("h2");
        const headingTemplate = `<div class="posts__heading"><h1><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> Table of contents</h1><ul></ul></div>`;
        bodyText.insertAdjacentHTML('afterbegin', headingTemplate);
        const headingContent = document.querySelector(".posts__heading ul");

        for (heading of headingText) {
            heading.id = `${heading.innerText.split(" ").join("-").replaceAll(",", "").toLowerCase()}`;

            headingContent.insertAdjacentHTML('afterbegin', `<li><a href="#${heading.innerText.split(" ").join("-").replaceAll(",", "").toLowerCase()}">${heading.innerText}</a></li>`);
        }

    }
}
