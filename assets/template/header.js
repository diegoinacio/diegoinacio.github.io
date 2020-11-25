const header = document.querySelector("div#main header#header");

// ! Title

const header_a = document.createElement("a");
header_a.href = "index.html";
header_a.className = "logo";
header.appendChild(header_a);

// * Functions
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandom(N) {
  return parseInt(Math.random() * N);
}

function getAlphabet(list) {
  let alphabet = [];
  for (let i = 0; i < list.length; i++) {
    let word = list[i];
    for (let j = 0; j < word.length; j++) {
      if (!alphabet.includes(word[j])) {
        alphabet.push(word[j]);
      }
    }
  }
  return alphabet.sort();
}

// * Prototypes
Number.prototype.nextRandom = function (N) {
  let next = this.valueOf();
  while (next === this.valueOf()) {
    next = parseInt(Math.random() * N);
  }
  return next;
};

String.prototype.getDifference = function (stringB) {
  let output = [];
  let stringA = this.valueOf();
  for (let i = 0; i < stringA.length; i++) {
    output.push(alphabet.indexOf(stringB[i]) - alphabet.indexOf(stringA[i]));
  }
  return output;
};

String.prototype.morphFromDiff = function (diff) {
  let string = this.valueOf();
  for (let i = 0; i < string.length; i++) {
    let element = string[i];
    let d = Math.sign(diff[i]);
    element = alphabet[alphabet.indexOf(element) + d];
    string = string.substr(0, i) + element + string.substr(i + 1);
  }
  return string;
};

// * Parameters
const TIME = 2000;
const time = 50;

// * Variables
let TITLES = [
  "mathematics",
  "computer science",
  "data science",
  "machine learning",
  "artificial intelligence",
  "computer vision",
  "digital image processing",
  "computer graphics",
  "xzy0123456789@",
];

// * Get alphabet
const alphabet = getAlphabet(TITLES);
TITLES.pop(); // ? remove additional characters

// * Get maximum title size
const n_titles = TITLES.length;
const max_size = TITLES.sort((a, b) => {
  return b.length - a.length;
})[0].length;

// * Pad all with whitespace, based on max size
TITLES = TITLES.map((e) => {
  return e.padEnd(max_size);
});

// * Get random indices (initial and final titles) ..
// * .. and its respective titles
let index_o = getRandom(n_titles);
let index_i = index_o.nextRandom(n_titles);
let title_o = TITLES[index_o];
let title_i = TITLES[index_i];

// * Get difference values between the titles
let diff = title_o.getDifference(title_i);
let diff_a = diff.map(Math.abs);
let diff_max = Math.max(...diff_a);

// * Outputs initial title
header_a.innerHTML = `<strong>Diego Inácio</strong> | <span>${title_o}</span>`;

setInterval(async function () {
  // * Start morphing
  while (title_o !== title_i) {
    title_o = title_o.morphFromDiff(diff);
    diff = title_o.getDifference(title_i);
    header_a.innerHTML = `<strong>Diego Inácio</strong> | <span>${title_o}</span>`;
    await sleep(time);
  }
  // * Update random titles
  index_o = index_i;
  index_i = index_o.nextRandom(n_titles);
  title_o = TITLES[index_o];
  title_i = TITLES[index_i];
}, TIME + time * (diff_max + 1));

// ! Icons

const header_ul = document.createElement("ul");
header_ul.className = "icons";
header.appendChild(header_ul);

const ICONS = [
  `<a href="https://www.linkedin.com/in/diegoinacio" class="icon brands fa-linkedin alt" target="_blank" title="diegoinacio @ LinkedIn"><span class="label">LinkedIn</span></a>`,
  `<a href="https://github.com/diegoinacio" class="icon brands fa-github alt" target="_blank" title="diegoinacio @ GitHub"><span class="label">GitHub</span></a>`,
  `<a href="https://diegoinacio.github.io/blog/" class="icon solid fa-pencil-alt alt" target="_blank" title="my personal blog"><span class="label">Blog</span></a>`,
  `<a href="https://www.youtube.com/user/diegodci" class="icon brands fa-youtube alt" target="_blank" title="diegodci @ YouTube"><span class="label">YouTube</span></a>`,
  `<a href="https://www.reddit.com/user/diecosina" class="icon brands fa-reddit-alien alt" target="_blank" title="diecosina @ Reddit"><span class="label">Reddit</span></a>`,
];

ICONS.forEach((icon) => {
  let li = document.createElement("li");
  li.innerHTML = icon;
  header_ul.appendChild(li);
});
