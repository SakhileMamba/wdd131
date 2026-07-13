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