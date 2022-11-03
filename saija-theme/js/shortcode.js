document.querySelectorAll("#lists li").forEach((el) => {
    const avatar = el.innerHTML.split(" ")[1].split("avatar=")[1].replace(/^"(.*)"$/, '$1');
    // https://techstacker.com/how-to-extract-text-between-double-quotes-javascript/
    const name = el.innerHTML.split("name=")[1].split('"')[1];
    const username = el.innerHTML.split("username=")[1].split('"')[1];

    el.innerHTML = `<div class="lists__item">
                        <img src="${avatar}" alt="${name}">
                        <div class="lists__item__data">
                            <span class="lists__item__name">${name}</span>
                            <span class="lists__item__username">${username}</span>
                        </div>
                    </div>`;
});