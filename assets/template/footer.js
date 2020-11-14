const footer = document.querySelector("div#main footer#footer");

const footer_hr = document.createElement("hr");
footer.appendChild(footer_hr);

const footer_p = document.createElement("p");
footer_p.className = "copyright page";
footer.appendChild(footer_p);

let year_ft = new Date().getFullYear();
footer_p.innerText = `© ${year_ft} Diego Inácio.`;
