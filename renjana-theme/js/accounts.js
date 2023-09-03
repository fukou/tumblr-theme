const followAccounts = async (users) => {
  const followsList = document.querySelector(".follows__list");

  if (followsList) {
    followsList.innerHTML = `<div class="follows__list__loading">Loading...</div>`; // Display loading text

    try {
      for (const user of users) {
        const titleBlog = await fetchTumblrTitle(user);
        appendUserToList(user, titleBlog);
      }

      if (users.length === 0) {
        followsList.innerHTML = `<div class="follows__list__none">No following blogs listed.</div>`; // Display fallback message
      } else {
        document.querySelector('.follows__list__loading').remove();
      }
    } catch (error) {
      console.error("Error loading blogs:", error);
      followsList.innerHTML = `<div class="follows__list__error">Error loading blogs.</div>`; // Display error message
    }
  }
};

const fetchTumblrTitle = async (user) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://${user}.tumblr.com/api/read/json`;
    script.onload = function () {
      if (tumblr_api_read && tumblr_api_read.tumblelog) {
        resolve(tumblr_api_read.tumblelog.title);
      } else {
        reject(new Error(`Failed to fetch data for ${user}`));
      }
    };
    script.onerror = function () {
      reject(new Error(`Failed to fetch data for ${user}`));
    };
    document.body.appendChild(script);
  });
};

const appendUserToList = (user, titleBlog) => {
  const userList = document.createElement("li");
  userList.className = "follows__list__item";
  userList.innerHTML = `<a href="https://${user}.tumblr.com/">
        <img src="https://api.tumblr.com/v2/blog/${user}.tumblr.com/avatar/96" alt="${user}">
        <div class="follows__list__detail">
            <h3>${titleBlog ? titleBlog : user}</h3>
            <p>@${user}</p>
        </div>
    </a>`;

  document.querySelector(".follows__list").appendChild(userList);
};
