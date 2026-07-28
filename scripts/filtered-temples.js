const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Add more temple objects here...
  {
    templeName: "Durban South Africa",
    location: "Umhlanga, KwaZulu-Natal, South Africa",
    dedicated: "2020, February, 16",
    area: 19860,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/durban-south-africa-temple/durban-south-africa-temple-72674-main.jpg"
  },
  {
    templeName: "San José Costa Rica",
    location: "Belén, Heredia, Costa Rica",
    dedicated: "2000, June, 4",
    area: 10700,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/_temp/087-San-Jos%C3%A9-Costa-Rica-Temple.jpg"
  },
  {
    templeName: "London England",
    location: "Surrey, England",
    dedicated: "1958, September, 9",
    area: 42652,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/london-england-temple/london-england-temple-56886-main.jpg"
  },
];


document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").innerHTML = `Last Modification: ${document.lastModified}`;

const navButton = document.querySelector('#nav-button');

/*
navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
});*/

const navBar = document.querySelector('nav');

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');
});

document.querySelector("#home").addEventListener("click", () => {
  document.querySelector("#way").textContent = "Home"
  createTempleCard(temples);
});

document.querySelector("#old").addEventListener("click", () => {
  document.querySelector("#way").textContent = "Old"
  createTempleCard(temples.filter((temple) => parseInt(temple.dedicated.slice(0, 5)) < 1900));
});

document.querySelector("#new").addEventListener("click", () => {
  document.querySelector("#way").textContent = "New"
  createTempleCard(temples.filter((temple) => parseInt(temple.dedicated.slice(0, 5)) > 2000));
});

document.querySelector("#small").addEventListener("click", () => {
  document.querySelector("#way").textContent = "Small"
  createTempleCard(temples.filter((temple) => temple.area < 10000));
});

document.querySelector("#large").addEventListener("click", () => {
  document.querySelector("#way").textContent = "Large"
  createTempleCard(temples.filter((temple) => temple.area > 90000));
});


function createTempleCard(filteredTemples) {
  document.querySelector("#temples").innerHTML = "";

  for (let i = 0; i < filteredTemples.length; i++ /*temple in temples*/) {
    let card = document.createElement("div");
    let name = document.createElement("h4");
    let location = document.createElement("p");
    let dedication = document.createElement("p");
    let size = document.createElement("p");
    let image = document.createElement("img");
    let text = document.createElement("div");

    name.textContent = filteredTemples[i].templeName;
    location.textContent = `Location: ${filteredTemples[i].location}`;
    dedication.textContent = `Dedicated: ${filteredTemples[i].dedicated}`;
    size.textContent = `Size: ${filteredTemples[i].area} sq ft`
    image.setAttribute("src", filteredTemples[i].imageUrl);
    image.setAttribute("alt", `${filteredTemples[i].templeName} image`);
    image.setAttribute("loading", "lazy");

    text.appendChild(name);
    text.appendChild(location);
    text.appendChild(dedication);
    text.appendChild(size);
    card.appendChild(text);
    card.appendChild(image);


    document.querySelector("#temples").appendChild(card);

  }
}

createTempleCard(temples)