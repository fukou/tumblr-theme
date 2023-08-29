document.addEventListener("DOMContentLoaded", () => {
  separateNotesAndShow();
  loadNotesViaAjax();
});

// Function to handle the loading of new notes
function tumblrNotesLoaded(notes_html) {
  const newNotesContainer = document.createElement("div");
  newNotesContainer.className = "posts__notes__temporary";
  newNotesContainer.innerHTML = notes_html;

  // Extract the notes and update the nextNotesURL for potential further loading
  let newNoteElements =
    newNotesContainer.querySelectorAll("ol.notes > li.note");

  // Append the new notes to their respective categories
  const reblogNotes = [];
  const likeNotes = [];
  const replyNotes = [];
  newNoteElements.forEach((noteElement) => {
    if (noteElement.classList.contains("reblog")) {
      reblogNotes.push(noteElement);
    } else if (noteElement.classList.contains("like")) {
      likeNotes.push(noteElement);
    } else if (noteElement.classList.contains("reply")) {
      replyNotes.push(noteElement);
    }
  });

  appendNewNotes("reblog", reblogNotes);
  appendNewNotes("like", likeNotes);
  appendNewNotes("reply", replyNotes);

  // Convert newNoteElements to an array before using filter
  const newNoteElementsArray = Array.from(newNoteElements);

  // Update the note count in tab buttons
  const categories = ["reblog", "like", "reply"];
  categories.forEach((category) => {
    const notesCount = newNoteElementsArray.filter((noteElement) =>
      noteElement.classList.contains(category)
    ).length;

    const tabButton = document.getElementById(`${category}-button`);
    if (tabButton) {
      tabButton.innerHTML = tabButton.innerHTML.replace(
        /\(\d+\)/,
        `(${notesCount})`
      );
    }
  });

  // Append the new notes before the "Load More Notes" button
  const moreNotesContainer = document.querySelector(".posts__notes__load");
  moreNotesContainer.parentElement.insertBefore(
    newNotesContainer,
    moreNotesContainer
  );
  if (newNotesContainer) {
    newNotesContainer.remove();
  }

  // Remove the original more_notes_link_container, which is included in the new notes
  let moreNotesLinkContainer = newNotesContainer.querySelector(
    ".more_notes_link_container"
  );
  if (moreNotesLinkContainer) {
    moreNotesLinkContainer.remove();
  }

  // Reattach the moreNotesLinkContainer to the document and set up a click event listener
  const clonedMoreNotesLinkContainer = moreNotesLinkContainer.cloneNode(true);
  moreNotesContainer.appendChild(clonedMoreNotesLinkContainer);

  // Generate the "Load more notes" button
  const getNotesURL = document
    .querySelector(".more_notes_link")
    .getAttribute("onclick");
  const regex = /'\/notes\/(.*?)',true/;
  const matches = getNotesURL.match(regex);
  const notesURL = matches ? "notes/" + matches[1] : null;

  const currentDomain = window.location.hostname.split(".")[0];
  let notesFullURL = `https://${currentDomain}.tumblr.com/${notesURL}`;

  console.log("%cNotes URL:", "background: #00f; color: white", notesFullURL);

  const btnLoadMore = document.createElement("a");
  btnLoadMore.className = "btn-load-more-notes";
  btnLoadMore.href = "#";
  btnLoadMore.textContent = "Load more notes";

  btnLoadMore.addEventListener("click", async (event) => {
    event.preventDefault();

    // Store the original text content
    const originalText = btnLoadMore.textContent;

    // Update the text content to "Loading..."
    btnLoadMore.textContent = "Loading...";

    try {
      const response = await fetch(notesFullURL);
      if (response.status >= 200 && response.status < 300) {
        const notesHtml = await response.text();
        tumblrNotesLoaded(notesHtml);

        // Revert back to the original text content
        btnLoadMore.textContent = originalText;
      } else {
        console.error("Error loading more notes");
        // Revert back to the original text content in case of an error
        btnLoadMore.textContent = originalText;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      // Revert back to the original text content in case of an error
      btnLoadMore.textContent = originalText;
    }
  });

  const existingBtn = moreNotesContainer.querySelector(".btn-load-more-notes");
  if (existingBtn) {
    existingBtn.remove();
  }

  // Append the new "Load more notes" button
  moreNotesContainer.appendChild(btnLoadMore);
  btnLoadMore.previousElementSibling.remove();

  // Return false to block Tumblr's default insertion
  return false;
}

// Function to load more notes via AJAX
async function loadNotesViaAjax() {
  const nextNotesURL = document
    .querySelector(".posts__perma__tumblr")
    .getAttribute("data-notes-url");

  if (nextNotesURL) {
    try {
      const response = await fetch(nextNotesURL);
      if (response.status >= 200 && response.status < 300) {
        const notesHtml = await response.text();
        tumblrNotesLoaded(notesHtml);
      } else {
        console.error("Error loading more notes");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
}

function appendNewNotes(category, newNotes) {
  const container = document.querySelector(`.posts__notes__${category}`);
  newNotes.forEach((note) => {
    container.appendChild(note);
  });
}

function separateNotesAndShow() {
  const reblogNotes = [];
  const likeNotes = [];
  const replyNotes = [];

  const noteElements = document.querySelectorAll("ol.notes > li.note");
  const noteContainer = document.querySelector("ol.notes");
  const noteLoads = document.createElement("div");
  noteLoads.className =
    "posts__notes__load flex flex--align-center flex--justify-center";

  let postsPerma = document.querySelector(".posts__perma__tumblr");

  noteElements.forEach((noteElement) => {
    if (noteElement.classList.contains("reblog")) {
      reblogNotes.push(noteElement);
    } else if (noteElement.classList.contains("like")) {
      likeNotes.push(noteElement);
    } else if (noteElement.classList.contains("reply")) {
      replyNotes.push(noteElement);
    } else if (noteElement.classList.contains("more_notes_link_container")) {
      noteLoads.appendChild(noteElement);
    }
  });

  createTabButtons();

  // Wrap the notes into a single container
  const notesContainer = document.createElement("div");
  notesContainer.className = "posts__notes__container";

  showNotes("reblog", reblogNotes, notesContainer);
  showNotes("like", likeNotes, notesContainer);
  showNotes("reply", replyNotes, notesContainer);

  postsPerma.appendChild(notesContainer);
  postsPerma.appendChild(noteLoads);

  // Show the reblog notes by default, and hide the others
  showCategory("reblog");

  //   const btnLoadMore = document.createElement("a");
  //   btnLoadMore.className = "btn-load-more-notes";
  //   btnLoadMore.href = notesURL;
  //   btnLoadMore.textContent = "Load more notes";
  //   btnLoadMore.addEventListener("click", (event) => {
  //     event.preventDefault();
  //     separateNotesAndShow();
  //   });
  //   postsPerma.appendChild(btnLoadMore);
}

function createTabButtons() {
  const categories = ["reblog", "like", "reply"];
  const tabsContainer = document.createElement("div");

  tabsContainer.className = "posts__notes__button";

  categories.forEach((category) => {
    const tabButton = document.createElement("button");
    const notesCount = document.querySelectorAll(
      `.posts__notes__${category} > li.note`
    ).length;

    if (category === "like") {
      tabButton.innerHTML = ` <svg fill="currentColor" stroke="1" viewBox="0 0 20 18" width="18px" height="18px" class="margin--right-10"><path d="M14.658 0c-1.625 0-3.21.767-4.463 2.156-.06.064-.127.138-.197.225-.074-.085-.137-.159-.196-.225C8.547.766 6.966 0 5.35 0 4.215 0 3.114.387 2.162 1.117c-2.773 2.13-2.611 5.89-1.017 8.5 2.158 3.535 6.556 7.18 7.416 7.875A2.3 2.3 0 0 0 9.998 18c.519 0 1.028-.18 1.436-.508.859-.695 5.257-4.34 7.416-7.875 1.595-2.616 1.765-6.376-1-8.5C16.895.387 15.792 0 14.657 0h.001zm0 2.124c.645 0 1.298.208 1.916.683 1.903 1.461 1.457 4.099.484 5.695-1.973 3.23-6.16 6.7-6.94 7.331a.191.191 0 0 1-.241 0c-.779-.631-4.966-4.101-6.94-7.332-.972-1.595-1.4-4.233.5-5.694.619-.475 1.27-.683 1.911-.683 1.064 0 2.095.574 2.898 1.461.495.549 1.658 2.082 1.753 2.203.095-.12 1.259-1.654 1.752-2.203.8-.887 1.842-1.461 2.908-1.461h-.001z"></path></svg> (${notesCount}) ${category}`;
    } else if (category === "reblog") {
      tabButton.innerHTML = ` <svg fill="currentColor" stroke="1" viewBox="0 0 20 18" width="18px" height="18px" class="margin--right-10" viewBox="0 0 17 18.1">
<path d="M12.8.2c-.4-.4-.8-.2-.8.4v2H2c-2 0-2 2-2 2v5s0 1 1 1 1-1 1-1v-4c0-1 .5-1 1-1h9v2c0 .6.3.7.8.4L17 3.6 12.8.2zM4.2 17.9c.5.4.8.2.8-.3v-2h10c2 0 2-2 2-2v-5s0-1-1-1-1 1-1 1v4c0 1-.5 1-1 1H5v-2c0-.6-.3-.7-.8-.4L0 14.6l4.2 3.3z"></path>
</svg> (${notesCount}) ${category}`;
    } else if (category === "reply") {
      tabButton.innerHTML = ` <svg fill="currentColor" stroke="1" viewBox="0 0 20 18" width="18px" height="18px" class="margin--right-10" viewBox="0 0 17 17">
<path d="M8.7 0C4.1 0 .4 3.7.4 8.3c0 1.2.2 2.3.7 3.4-.2.6-.4 1.5-.7 2.5L0 15.8c-.2.7.5 1.4 1.2 1.2l1.6-.4 2.4-.7c1.1.5 2.2.7 3.4.7 4.6 0 8.3-3.7 8.3-8.3C17 3.7 13.3 0 8.7 0zM15 8.3c0 3.5-2.8 6.3-6.4 6.3-1.2 0-2.3-.3-3.2-.9l-3.2.9.9-3.2c-.5-.9-.9-2-.9-3.2.1-3.4 3-6.2 6.5-6.2S15 4.8 15 8.3z"></path>
</svg> (${notesCount}) ${category}`;
    }

    tabButton.className = `posts__notes__button-tabs | posts__notes__button-${category}`;
    tabButton.id = `${category}-button`;
    tabButton.addEventListener("click", () => showCategory(category));
    tabsContainer.appendChild(tabButton);
  });

  const postsPerma = document.querySelector(".posts__perma__tumblr");
  postsPerma.appendChild(tabsContainer);

  const reblogButton = document.getElementById("reblog-button");
  reblogButton.classList.add("active");
}

function showCategory(category) {
  const allContainers = document.querySelectorAll(
    ".posts__notes__container > div"
  );
  allContainers.forEach((container) => {
    container.style.display = "none";
  });

  const allButtons = document.querySelectorAll(
    ".posts__notes__button > button"
  );
  allButtons.forEach((button) => {
    button.classList.remove("active");
  });

  const selectedContainer = document.querySelector(
    `.posts__notes__${category}`
  );
  selectedContainer.style.display = "block";

  const selectedButton = document.getElementById(`${category}-button`);
  selectedButton.classList.add("active");
}

function showNotes(category, notes, container) {
  const notesContainer = document.createElement("div");
  notesContainer.className = `posts__notes__${category}`;

  //   if (notes.length === 0) {
  //     // const placeholder = document.createElement("p");
  //     // placeholder.className = "no-notes";
  //     // placeholder.textContent = `No ${ category } to show`;
  //     // notesContainer.appendChild(placeholder);
  //     // container.appendChild(notesContainer);
  //   } else {

  //   }
  notes.forEach((note) => {
    notesContainer.appendChild(note);
  });
  container.appendChild(notesContainer);
}
