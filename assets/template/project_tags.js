const DIV_TAGS = document.querySelectorAll(".tags");

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
