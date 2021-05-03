const ARTICLE = document.querySelectorAll("article");
let DIV_TAGS = document.querySelectorAll(".tags");

// ! Tag list
let TAG_LIST = [];
DIV_TAGS.forEach((div) => {
  let TAGS = div.innerText.split(",").map((e) => e.trim());
  TAGS.forEach((tag) => {
    if (!TAG_LIST.includes(tag)) {
      TAG_LIST.push(tag);
    }
  });
});

TAG_LIST.sort();

// ! Color definition
let TAG_HUE = {};
for (const [i, e] of TAG_LIST.entries()) {
  TAG_HUE[e] = parseInt((360 * i) / TAG_LIST.length);
}

// ! Set tag menu
const TAG_MENU = document.querySelector(".tags-menu");
let TAG_MENU_UL = document.createElement("ul");
TAG_MENU.appendChild(TAG_MENU_UL);
for (key in TAG_HUE) {
  let li = document.createElement("li");
  li.innerText = key;
  li.style = `
    background-color: hsla(${TAG_HUE[key]}, 50%, 70%, 0.1);
    border: 1px solid hsla(${TAG_HUE[key]}, 70%, 50%, 0.1);
  `;
  li.setAttribute("selected", "false");
  li.addEventListener("click", tags_menu_selection);
  TAG_MENU_UL.appendChild(li);
}

// ! Set tags
DIV_TAGS.forEach((div) => {
  let TAGS = div.innerText.split(",").map((e) => e.trim());
  div.innerText = "";
  let ul = document.createElement("ul");
  div.appendChild(ul);
  TAGS.forEach((tag) => {
    let li = document.createElement("li");
    li.innerText = tag;
    li.style = `
      background-color: hsla(${TAG_HUE[tag]}, 50%, 70%, 0.1);
      border: 1px solid hsla(${TAG_HUE[tag]}, 70%, 50%, 0.1);
    `;
    ul.appendChild(li);
  });
});

// ! Event listener functions
function enable_all() {
  ARTICLE.forEach((article) => {
    article.style = "";
  });
}

function set_article_visibility() {
  let TAG_MENU_LI = TAG_MENU_UL.querySelectorAll("li");
  TAG_MENU_LI = Array.from(TAG_MENU_LI);
  const enabled_tags = TAG_MENU_LI.filter(
    (e) => e.getAttribute("selected") == "true"
  ).map((e) => e.innerText);

  if (!TAG_MENU_LI.some((e) => e.getAttribute("selected") == "true")) {
    // * Verify if no tags have been selected
    enable_all();
  } else {
    ARTICLE.forEach((article) => {
      let TAGS_LI = article.querySelectorAll(".tags ul li");
      TAGS_LI = Array.from(TAGS_LI);
      if (TAGS_LI.some((e) => enabled_tags.includes(e.innerText))) {
        article.style = "";
      } else {
        article.style = "display: none";
      }
    });
  }
}

function tags_menu_selection(e) {
  const li = e.target;

  if (li.getAttribute("selected") == "true") {
    li.setAttribute("selected", "false");
  } else {
    li.setAttribute("selected", "true");
  }

  set_article_visibility();
}
