const ARTICLE = document.querySelectorAll("article");
let DIV_TAGS = document.querySelectorAll(".tags");

let SET_TYPE = "union";

// ! Set selector button
let setSelector = document.getElementById("set-selector");
setSelector.addEventListener("click", (e) => {
  let button = e.target;
  switch (button.className) {
    case "set-type-union":
      button.className = "set-type-intersection";
      SET_TYPE = "intersection";
      break;
    case "set-type-intersection":
      button.className = "set-type-difference";
      SET_TYPE = "difference";
      break;
    case "set-type-difference":
      button.className = "set-type-complement";
      SET_TYPE = "complement";
      break;
    default:
      button.className = "set-type-union";
      SET_TYPE = "union";
      break;
  }

  set_article_visibility();
});

// ! Tag list
let TAG_LIST = [];
DIV_TAGS.forEach((div) => {
  let TAGS = div.innerText.split(",").map((e) => e.trim());
  TAGS.forEach((tag) => {
    if (!TAG_LIST.map((e) => e.tag).includes(tag)) {
      TAG_LIST.push({ tag: tag, count: 1 });
    } else {
      let index = TAG_LIST.findIndex((e) => e.tag == tag);
      TAG_LIST[index].count += 1;
    }
  });
});

TAG_LIST.sort((a, b) => (a.tag > b.tag ? 1 : -1));

// ! Color definition
for (const [i, e] of TAG_LIST.map((e) => e.tag).entries()) {
  TAG_LIST[i].hue = parseInt((360 * i) / TAG_LIST.length);
}

// ! Set tag menu
const TAG_MENU = document.querySelector(".tags-menu");
let TAG_MENU_UL = document.createElement("ul");
TAG_MENU.appendChild(TAG_MENU_UL);
for ({ tag, count, hue } of TAG_LIST) {
  let li = document.createElement("li");
  li.innerText = tag;
  li.style = `
    background-color: hsla(${hue}, 50%, 70%, 0.1);
    border: 1px solid hsla(${hue}, 70%, 50%, 0.1);
  `;
  li.setAttribute("counter", count);
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
    let hue_ = TAG_LIST[TAG_LIST.findIndex((e) => e.tag == tag)].hue;
    li.style = `
      background-color: hsla(${hue_}, 50%, 70%, 0.1);
      border: 1px solid hsla(${hue_}, 70%, 50%, 0.1);
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

function enable_selected(article_tags, enabled_tags, all_tags) {
  console.log(1, article_tags);
  console.log(2, enabled_tags);
  switch (SET_TYPE) {
    case "intersection":
      return enabled_tags.every((e) => article_tags.includes(e));

    case "difference":
      return (
        enabled_tags.some((e) => article_tags.includes(e)) &&
        !enabled_tags.every((e) => article_tags.includes(e))
      );

    case "complement":
      return !enabled_tags.some((e) => article_tags.includes(e));

    default:
      return enabled_tags.some((e) => article_tags.includes(e));
  }
}

function set_article_visibility() {
  let TAG_MENU_LI = TAG_MENU_UL.querySelectorAll("li");
  TAG_MENU_LI = Array.from(TAG_MENU_LI);
  const enabled_tags = TAG_MENU_LI.filter(
    (e) => e.getAttribute("selected") == "true"
  ).map((e) => e.innerText);
  const all_tags = TAG_MENU_LI.map((e) => e.innerText);

  if (!TAG_MENU_LI.some((e) => e.getAttribute("selected") == "true")) {
    // * Verify if no tags have been selected
    enable_all();
  } else {
    ARTICLE.forEach((article) => {
      let article_tags = article.querySelectorAll(".tags ul li");
      article_tags = Array.from(article_tags).map((e) => e.innerText);
      if (enable_selected(article_tags, enabled_tags, all_tags)) {
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
