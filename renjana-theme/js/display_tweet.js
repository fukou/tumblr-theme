function recent_tweets(data) {
    for (i=0; i<4; i++) {
        document.getElementById("tweets").innerHTML =
            document.getElementById("tweets").innerHTML +
            `<a href="https://twitter.com/${data[i].user.screen_name}/status/${data[i].id_str ? data[i].id_str : data[i].id}">
                    <div class="tweets">
                        <div class="tweets__user">
                            <img src="${data[i].user.profile_image_url}"> <span>${data[i].user.screen_name}</span>
                        </div>
                        <div class="tweets__text">
                            ${data[i].text}
                        </div>
                    </div>
                </a>
            `;
    }

    document.getElementById("twitter").style.display = 'block';
}