function filter() {
    const postsFiltered = document.querySelectorAll(".posts");
    const listFilter = [
        "spoiler",
        "spoilers",
        "warning",
    ];

    postsFiltered.forEach(function(item, idx) {
        // const isFiltered = item.classList.contains("spoilers");
        const className = item.className.split(" ");
        console.log(className);

        const containerFilter = document.createElement("div");
            containerFilter.className = "posts__filtered";
            containerFilter.innerHTML = `
                <h2>This post contains filtered tags</h2>
                <ul>
                ${className.map(tag => {
                    let isTag = false
                        listFilter.filter(tags => {
                        if(tags === tag) isTag = true} ) 
                    return isTag ? `<li><a href="/tagged/${tag}">${tag}</a></li>` : '';
                }).join('')}
                </ul>
                <button class="view-post">View post</button>
            `;

        let isFiltered = false;
        className.filter(a => listFilter.filter(b => {
            if(b === a) isFiltered = true} ));

        if(isFiltered) {
            item.setAttribute("post-data", "filtered")
            item.prepend(containerFilter);

            item.querySelector(".view-post").addEventListener("click", function() {
                containerFilter.classList.add("is-hidden");
                item.classList.add("is-shown");
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", filter);