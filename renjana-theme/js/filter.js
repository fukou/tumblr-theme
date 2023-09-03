/* 
 * filterTags.js
 * A plugin for filtering post using a tag system from Tumblr in vanilla JavaScript.
 * @version 1.0.0
 * @author Faiz IJ <github.com/fukou>
 * @website https://fukuo.site
*/

function filterTags(options) {
    let defaultOptions = {
        selector: ".posts",
        filterList: [
            "spoiler",
            "spoilers",
            "warning",
        ],
        showTags: true,
        filterButton: "View post",
        filterTextWarning: "This post contains filtered tags"
    }

    options = { ...defaultOptions, ...options};

    const postsFiltered = document.querySelectorAll(options.selector);
    const listFilter = options.filterList;

    postsFiltered.forEach(function(item, idx) {
        const className = item.className.split(" ");

        const containerFilter = document.createElement("div");
            containerFilter.className = "posts__filtered";
            containerFilter.innerHTML = `
                <h2>${options.filterTextWarning}</h2>
                <ul>
                ${options.showTags ? className.map(tag => {
                    let isTag = false
                        listFilter.filter(tags => {
                        if(tags === tag) isTag = true} ) 
                    return isTag ? `<li><a href="/tagged/${tag}">${tag}</a></li>` : '';
                }).join('') : ""}
                </ul>
                <button class="view-post">${options.filterButton}</button>
            `;

        let isFiltered = false;
        className.filter(a => listFilter.filter(b => {
            if(b === a) isFiltered = true} ));

        if(isFiltered) {
            item.setAttribute("data-article-spoiler", "true")
            item.prepend(containerFilter);

            item.querySelector(".view-post").addEventListener("click", function() {
                containerFilter.classList.add("is-hidden");

                setTimeout(function () {
                    // Calculate the post content's height (assuming it's the direct child)
                    const contentHeight = item.parentElement.clientHeight + "px"; // .posts
              
                    // Apply the calculated height to max-height for smooth transition
                    item.style.maxHeight = contentHeight;
                    containerFilter.classList.add("is-hidden");
                    item.classList.add("is-shown");
                  }, 100);
            });
        }
    });
}