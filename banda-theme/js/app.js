var app = {
  init: function () {
    // app.loadPosts();
    app.loadTabs();
    // app.loadAudio();
    // app.postNPF();
    // app.postTruncated();
    // app.postPhotosets();
    // app.postSoundCloud();
    // app.postSpotify();
    // app.postBandCamp();
    // app.postAudio();
    app.musicPlayer();
    // methods
    app.truncate();
    app.darkMode();
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
  musicPlayer: () => {
    window.addEventListener("load", () => {
      const tracks = [
        {
          name: "CRIMEWAVE by Crystal Castles",
          cover: "https://64.media.tumblr.com/tumblr_m6z52kYe2J1qc8uv9o1_cover.jpg",
          src: "https://a.tumblr.com/tumblr_m6z52kYe2J1qc8uv9o1.mp3",
        },
        {
          name: "SATURN by Sleeping at Last",
          cover:
            "https://64.media.tumblr.com/tumblr_nv99cfKo8b1qa9270o1_1443222159_cover.jpg",
          src: "https://a.tumblr.com/tumblr_nv99cfKo8b1qa9270o1.mp3",
        },
        {
          name: "THE GIRL IN BYAKKOYA by Susumu Hirasawa",
          cover:
            "https://64.media.tumblr.com/tumblr_mmjp5wTAeL1rqe52oo1_1368126501_cover.jpg",
          src: "https://a.tumblr.com/tumblr_mmjp5wTAeL1rqe52oo1.mp3",
        },
        {
          name: "ALEXANDER by Jirapah",
          cover:
            "https://64.media.tumblr.com/tumblr_n35avkZ5aR1tw93h7o1_1396008272_cover.jpg",
          src: "https://a.tumblr.com/tumblr_n35avkZ5aR1tw93h7o1.mp3",
        }
      ];
    
      const play = document.querySelector(".play-btn");
      const next = document.querySelector(".play-next");
      const prev = document.querySelector(".play-prev");
    
      let audio = document.querySelector(".audio");
      let title = document.querySelector(".music__information");
      let cover = document.querySelector(".music__inner");
      let progress = document.querySelector(".music__progress");
      let counts = document.querySelector(".music__counts");
      let dursContainer = document.querySelector(".music__duration");
      let durs = document.querySelector(".totalDurs");
      let currentDurs = document.querySelector(".currentDurs");
      let percent = 0;
      let current = 0;
      let timer;
    
      play.addEventListener("click", playAudio);
      next.addEventListener("click", nextAudio);
      prev.addEventListener("click", prevAudio);
      audio.addEventListener("playing", function (_event) {
        let duration = _event.target.duration;
        advance(duration, audio);
      });
    
      audio.addEventListener("pause", function (_event) {
        clearTimeout(timer);
      });
    
      tracks.forEach((track) => {
        console.table(track);
      });
    
      load();
    
      function load(index) {
        this.current = index;
        title.innerHTML = tracks[current]["name"];
        cover.setAttribute(
          "style",
          "background:url('" +
            tracks[current]["cover"] +
            "'); background-size:cover;background-position:center;background-repeat:no-repeat;"
        );
        audio.innerHTML = `<source src="${tracks[current]["src"]}" type="audio/mp3">`;
  
        counts.innerHTML = `${current + 1} / ${tracks.length}`;
    
        audio.load();
        buttonAudio();
    
        audio.onloadedmetadata = function () {
          // console.log("Loaded metadata for duration=%s",
          //             durations(audio.duration));
          durs.innerHTML = durations(audio.duration);
        };
    
        audio.ontimeupdate = function () {
          currentDurs.innerHTML = durations(audio.currentTime);
        };
    
        audio.onended = function () {
          play.innerHTML = `<i class="las la-play"></i>`;
          progress.style.width = 0 + "%";
        };
      }
    
      function playAudio() {
        if (audio.paused) {
          this.innerHTML = `<i class="las la-pause"></i>`;
          audio.play();
        } else {
          this.innerHTML = `<i class="las la-play"></i>`;
          audio.pause();
        }
      }
    
      function nextAudio() {
        if (current < tracks.length - 1 || !audio.paused) {
          play.innerHTML = `<i class="las la-play"></i>`;
          current++;
          load(current);
    
          buttonAudio();
        }
      }
    
      function prevAudio() {
        if (current > 0 || !audio.paused) {
          play.innerHTML = `<i class="las la-play"></i>`;
          current--;
          load(current);
    
          buttonAudio();
        }
      }
    
      function buttonAudio() {
        prev.disabled = current <= 0;
        next.disabled = current >= tracks.length - 1;
      }
    
      function startTimer(duration, element) {
        if (percent < 100) {
          timer = setTimeout(function () {
            advance(duration, element);
          }, 100);
        }
      }
    
      function durations(currentTime) {
        var d = currentTime;
        var sec,
          min = Number();
        sec = Math.floor(d);
        min = Math.floor(sec / 60);
        min = min >= 10 ? min : "0" + min;
        sec = Math.floor(sec % 60);
        sec = sec >= 10 ? sec : "0" + sec;
    
        return min + ":" + sec;
      }
    
      function advance(duration, element) {
        increment = 10 / duration;
        percent = Math.min(increment * element.currentTime * 10, 100);
        progress.style.width = percent + "%";
        startTimer(duration, element);
      }
    
      // https://awik.io/determine-color-bright-dark-using-javascript/
    });    
  },
  darkMode: () => {
    const btnLight = document.querySelector('button[data-type-button="light"]');
    const btnDark = document.querySelector('button[data-type-button="dark"]');
    const currentTheme = localStorage.getItem("theme");

    let theme;

    if (currentTheme == "dark") {
      document.body.classList.add("dark-theme");
      btnDark.classList.add("is-actived");
      btnLight.classList.remove("is-actived");
    } 
    
    btnDark.addEventListener("click", function() {
      btnDark.classList.add("is-actived");
      btnLight.classList.remove("is-actived");

      theme = "dark";
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", theme);
    });

    btnLight.addEventListener("click", function() {
      btnDark.classList.remove("is-actived");
      btnLight.classList.add("is-actived");
     
      theme = "light";
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", theme);
    })
  
  }
};

document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
