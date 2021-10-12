document.addEventListener('DOMContentLoaded', function() {
    const posts = document.querySelectorAll(".posts .posts__audio");

    const findAudio = document.querySelectorAll(".posts .posts__audio");
    findAudio.forEach(function(post, idx) {
        const tumblrAudio = post.querySelector("iframe.tumblr_audio_player").getAttribute("src");
        const visualAudio = post.querySelector(".posts__audio--visual");
        const btnAudio = post.querySelector(".btn-play")
        let playButton = btnAudio.querySelector('#play');
        let pauseButton = btnAudio.querySelector('#pause');
    
        const srcs = tumblrAudio.split("audio_file=")[1].split("&")[0];
        const getSources = decodeURIComponent(srcs);
    
        var wavesurfer = WaveSurfer.create({
            container: visualAudio,
            waveColor: 'rgba(0,0,0,0.15)',
            progressColor: 'rgba(0,0,0,0.5)'
         });
        wavesurfer.load(getSources);
    
        btnAudio.addEventListener("click", function() {
            wavesurfer.playPause();
        });
    
        wavesurfer.on('play', function() {
            playButton.style.display = 'none';
            pauseButton.style.display = 'block';
        });
        wavesurfer.on('pause', function() {
            playButton.style.display = 'block';
            pauseButton.style.display = 'none';
        });
    });
});


// https://stackoverflow.com/questions/19790506/multiple-audio-html-auto-stop-other-when-current-is-playing-with-javascript
document.addEventListener(
    "play",
    function (e) {
        let a = document.getElementsByTagName("audio");
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] != e.target) {
                a[i].pause();
                play[i].innerHTML = `<i class="las la-play"></i>`;
            }
        }
    },
    true
);