function ready() {
    const postsFiltered = document.querySelectorAll(".posts");
    postsFiltered.forEach(function(item, idx) {
        const isFiltered = item.classList.contains("spoilers");
        const className = item.className.split(" ").slice(1).join(", ");
        console.log(className);

        const containerFilter = document.createElement("div");
            containerFilter.className = "posts__filtered";
            containerFilter.innerHTML = `
                <h2>This post contains filtered tags</h2>
                <p>${className}</p>
                <button>View post</button>
            `;

        if(isFiltered) {
            item.setAttribute("post-data", "filtered")
            item.prepend(containerFilter);
            console.log("It's filtered");
        } else {
            console.log("It's not filtered");
        }
    });
}

document.addEventListener("DOMContentLoaded", ready);