const allPosts = document.querySelectorAll(".wrapper__inner--lists .posts");
        allPosts.forEach(function (post, idx) {
        if(post) {
           post.addEventListener("click", function (e) {
               e.preventDefault();
               e.target.parentElement.classList.add("is-selected");

               const postID = e.target.parentElement.id;
               let postURL = "/post/" + postID;

               const newURL = postURL;
               const source = `
                <div class="wrapper__inner--source">
                    <div class="wrapper__inner--url">
                        <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></span>
                        <span class="url"><a href="${postURL}">${postURL}</a></span>
                        </div>
                        <div class="wrapper__inner--date">
                          Posted on Monday, 1 November 2021
                        </div>
                </div>
               `;
          
               var xhr = new XMLHttpRequest()
               xhr.onreadystatechange = function() {
                  if (this.readyState === 4) {
                     var doc = this.response;
                     var article = doc.querySelector('.wrapper__inner--blog > div').innerHTML;
                     //  https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
                     window.history.replaceState("", '', newURL);
                     document.querySelector("#toAppend").innerHTML = article;
                     document.querySelector(".wrapper__inner--link").innerHTML = source;
                  }
               }
               xhr.open('GET', postURL, true);
               xhr.responseType = 'document';
               xhr.send();
            });
          }
        });
        document.addEventListener("click", function (e) {
            let a = document.querySelectorAll(".wrapper__inner--lists .posts");
            for (var i = 0, len = a.length; i < len; i++) {
                if (a[i] != e.target) {
                    a[i].classList.remove("is-selected");
                }
            }
        },
        true
    );