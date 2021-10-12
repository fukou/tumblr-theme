const themes = (data) => {
  const container__slider = document.querySelector(".homepage__slider");
  for (let k = 0; k < 2; k++) {
    const theme = data.posts[k];

    const cpt_img = theme["photo-url-1280"];
    const cpt_url = theme["url"];
    const cpt = theme["photo-caption"].substring(0, 200) + "...";
    const tags = theme["tags"];
    const tags_data = tags
      .map(function (item) {
        return `<li>${item}</li>`;
      })
      .join("");

    const card = document.createElement("div");
    card.className = "homepage__card";

    card.innerHTML = `
        <div class="homepage__card--inner">
          <figure>
            <img src="${cpt_img}" alt="">
          </figure>
          <div class="body__caption">
            <div class="body__categories">
                <ul>
                    ${tags_data}
                </ul>
            </div>
            ${cpt}
            <div class="mt-2">
                <a href="${cpt_url}" class="cta__button cta__button--primary">View more&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg></a>
            </div>
          </div>
        </div>
    `;
    container__slider.appendChild(card);
  }

  const slider = tns({
    container: ".homepage__slider",
    slideBy: "page",
    loop: false,
    autoplay: false,

    nav: false,
    gutter: 30,
    responsive: {
      350: {
        items: 1,
        controls: true,
        edgePadding: 0,
      },
      900: {
        controls: true,
        items: 2,
        edgePadding: 0,
        gutter: 40,
      },
    },
    controlsText: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg> <span>Prev</span>',
      '<span>Next</span> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=1 stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>',
    ],
  });
};
