const sidebar = document.querySelector("div#sidebar div.inner");

// ! Navigation

const sidebar_nav = document.createElement("nav");
sidebar_nav.id = "menu";
sidebar.appendChild(sidebar_nav);

// * Header

const sidebar_nav_header = document.createElement("header");
sidebar_nav_header.className = "major";
sidebar_nav.appendChild(sidebar_nav_header);

sidebar_nav_header.innerHTML = `<h2>.menu.</h2>`;

// * Items

const sidebar_nav_ul = document.createElement("ul");
sidebar_nav_ul.className = "major";
sidebar_nav.appendChild(sidebar_nav_ul);

const ITEMS = [
  `<a href="index.html">Home</a>`,
  `<a href="about.html">About</a>`,
  `<a href="blog.html">Blog</a>`,
  `
  <span class="opener">Projects</span>
  <ul>
    <li><a href="project_open_source.html">Open Source</a></li>
    <li><a href="project_machine_intelligence.html">Machine Intelligence</a></li>
    <li><a href="project_creative.html">Creative Stuff</a></li>
  </ul>
  `,
  `<a href="resume.html">Resume</a>`,
];

ITEMS.forEach((item) => {
  let li = document.createElement("li");
  li.innerHTML = item;
  sidebar_nav_ul.appendChild(li);
});

// ! Contact

const sidebar_section = document.createElement("section");
sidebar.appendChild(sidebar_section);

// * Header

const sidebar_section_header = document.createElement("header");
sidebar_section_header.className = "major";
sidebar_section.appendChild(sidebar_section_header);

sidebar_section_header.innerHTML = `<h2>.contact.</h2>`;

// * Text

let sidebar_section_p = document.createElement("p");
sidebar_section.appendChild(sidebar_section_p);

sidebar_section_p.innerHTML = `Feel free to get in touch and talk about anything interesting 😊. You can reach me <em>by email</em> at <a href="mailto:diegodci@gmail.com">diegodci@gmail.com</a>.`;

// ! Footer

const sidebar_footer = document.createElement("footer");
sidebar_footer.id = "footer";
sidebar.appendChild(sidebar_footer);

const sidebar_footer_p = document.createElement("p");
sidebar_footer_p.className = "copyright";
sidebar_footer.appendChild(sidebar_footer_p);

let year_sb = new Date().getFullYear();
sidebar_footer_p.innerText = `© ${year_ft} Diego Inácio.`;
