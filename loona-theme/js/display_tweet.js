function recent_tweets(data) {
    for (i=0; i<4; i++) {
        document.getElementById("tweets").innerHTML =
            document.getElementById("tweets").innerHTML +
            `<a href="https://twitter.com/_fukuo/status/${data[i].id_str ? data[i].id_str : data[i].id}">
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

// if(typeof recent_tweets === "function"){
//     recent_tweets();
// } else {
//     document.querySelector(".is-twitter").innerHTML = `
//         <div class="wrapper__sidebar--body">
//             <h2>Unable to load tweets</h2>
//             <p>Failed to load the data, please make sure to connect Twitter on your settings and make your profile public.</p>
//         </div>
//     `;
// }
