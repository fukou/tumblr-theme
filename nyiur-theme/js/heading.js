
/*
* TOC.js
* A plugin for generating a table of contents on Tumblr posts
* @version 1.0.0
* @author Faiz IJ <github.com/fukou>
* @website https://fukuo.site
*/

function generateTOC(options) {
    let defaultOptions = {
        selector: ".posts",
        heading: "Table of contents",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>'
    }

    options = { ...defaultOptions, ...options};

    const allPosts = document.querySelectorAll(options.selector);
    for (let l = 0; l < allPosts.length; l++) {
        if (allPosts[l].classList.contains("posts_text")) {
            const isText = document.querySelector(".posts_text");
            const bodyText = isText;
            const headingText = bodyText.querySelectorAll("h2");
            const headingTemplate = `
            <div class="toc-wrapper">
                <h1>
                    ${options.icon}
                    ${options.heading}
                </h1>
                <ul></ul>
            </div>`;


            bodyText.insertAdjacentHTML('afterbegin', headingTemplate);
            const headingContent = document.querySelector(".toc-wrapper ul");
    
            for (heading of headingText) {
                heading.id = `${heading.innerText.split(" ").join("-").replaceAll(",", "").toLowerCase()}`;
    
                headingContent.insertAdjacentHTML('afterbegin', `<li><a href="#${heading.innerText.split(" ").join("-").replaceAll(",", "").toLowerCase()}">${heading.innerText}</a></li>`);
            }
    
        }
    }
}