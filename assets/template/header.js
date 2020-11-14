const header = document.querySelector("div#main header#header");

// ! Title

const TITLES = [
  "mathematics",
  "computer science",
  "data science",
  "machine learning",
  "artificial intelligence",
  "computer vision",
  "digital image processing",
  "computer graphics",
];

const N = TITLES.length;
let title_i = parseInt(Math.random() * N);

const header_a = document.createElement("a");
header_a.href = "index.html";
header_a.className = "logo";
header.appendChild(header_a);

header_a.innerHTML = `<strong>Diego Inácio</strong> | ${TITLES[title_i]}`;

setInterval(() => {
  title_i = parseInt(Math.random() * N);
  header_a.innerHTML = `<strong>Diego Inácio</strong> | ${TITLES[title_i]}`;
}, 2000);

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
