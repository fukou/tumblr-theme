var app = {
  init: function () {
    app.loadPosts();
    app.loadTabs();
    app.loadAudio();
    app.postNPF();
    // app.postTruncated();
    app.postPhotosets();
    app.postSoundCloud();
    app.postSpotify();
    app.postBandCamp();
    app.postAudio();

    // methods
    app.truncate();
  },
  loadPosts: () => {
    const allPosts = document.querySelectorAll(".wrapper__inner--lists .posts");
    allPosts.forEach(function (post, idx) {
      if (post) {
        post.addEventListener("click", function (e) {
          e.preventDefault();

          for (let a of allPosts) {
            a.classList.remove("is-selected");
          }
          
          e.target.parentElement.classList.add("is-selected");

          document
            .querySelector(".wrapper__inner--details")
            .classList.add("is-filled");

          document.querySelector(".wrapper__inner--details").scrollTop = 0;
          
          var noteCount = e.target.nextElementSibling.querySelector(".notes-button").getAttribute("href");
          const postID = e.target.parentElement.id;
          let postURL = "/post/" + postID;
          let domain = window.location.hostname;

          const newURL = postURL;
          const source = `
                <div class="wrapper__inner--source">
                    <div class="wrapper__inner--url">
                        <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></span>
                        <span class="url"><a href="${postURL}">${domain}${postURL}</a></span>
                        </div>
                        <div class="wrapper__inner--date">
                          Posted on Monday, 1 November 2021
                        </div>
                </div>
               `;

          // posts  
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
              var doc = this.response;
              var article = doc.querySelector(
                ".wrapper__inner--blog > div"
              ).innerHTML;
              //  https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
              window.history.replaceState("", "", newURL);
              document.querySelector("#toAppend").innerHTML = article;
              document.querySelector(".wrapper__inner--link").innerHTML =
                source;
              app.postAudio(".posts");
              app.postNPF();
              app.postPhotosets();
              app.postSoundCloud();
              app.postSpotify();
              app.postBandCamp();
            }
          };
          xhr.open("GET", postURL, true);
          xhr.responseType = "document";
          xhr.send();


          // notes
          var notes = new XMLHttpRequest();
          notes.onreadystatechange = function () {
            if (this.readyState === 4) {
              var note = this.response;
              document.querySelector("#toNotes").innerHTML = note;
            }
          };
          notes.open("GET", noteCount, true);
          notes.send();
        });
      }
    });
  },
  loadTabs: () => {
    const tabs = new Tabby("[data-tabs]");
  },
  loadAudio: () => {
    app.postAudio(".posts");
  },
  postNPF: () => {
    const npfOptions = {
      includeCommonPhotosets: false,
      photosetMargins: "0",
      galleryIndicatorClass: "npf_gallery_indicator",
      galleryIndicatorContent: "<i class='las la-expand'></i>",
    };
    npfPhotosets(".posts", npfOptions);
  },
  // postTruncated: () => {
  //     app.truncate(".wrapper__inner--lists .posts .posts__body > div");
  // },
  postPhotosets: () => {
    initPhotosets();
  },
  postSoundCloud: () => {
    const soundcloudColor = "#de8100";
    const soundcloudPlayers = document.querySelectorAll(
      ".soundcloud_audio_player"
    );

    if (soundcloudPlayers) {
      soundcloudPlayers.forEach(function (s, idx) {
        const url = s.getAttribute("src").split("&")[0];
        const options =
          "&amp;liking=false&amp;sharing=false&amp;auto_play=false&amp;show_comments=false&amp;continuous_play=false&amp;buying=false&amp;show_playcount=false&amp;show_artwork=true&amp;origin=tumblr&amp;color=" +
          soundcloudColor.split("#")[1];
        s.setAttribute("src", url + options);
        s.setAttribute("height", 116);

        s.parentElement.classList.add("is-soundcloud");
      });
    }
  },
  postSpotify: () => {
    const spotifyPlayers = document.querySelectorAll(".spotify_audio_player");
    if (spotifyPlayers) {
      spotifyPlayers.forEach(function (sp, idx) {
        sp.parentElement.classList.add("is-spotify");
      });
    }
  },
  postBandCamp: () => {
    const bandCamp = document.querySelectorAll(".bandcamp_audio_player");
    if (bandCamp) {
      for (b of bandCamp) {
        b.parentElement.classList.add("is-bandcamp");
      }
    }
  },
  postAudio: (element) => {
    let settings = {
      post: element,
    };
    const isAudio = new customAudio(settings);
  },
  truncate: (
    element,
    isType = "sentences",
    isLength = 10,
    isReadmore = false
  ) => {
    if (document.querySelectorAll(element).length) {
      const isTruncatedOptions = {
        truncate: isType,
        length: isLength,
        readMore: isReadmore,
      };

      let isTruncated = new Cuttr(element, isTruncatedOptions);
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
