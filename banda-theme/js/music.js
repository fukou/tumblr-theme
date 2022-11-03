
    window.addEventListener("load", () => {
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