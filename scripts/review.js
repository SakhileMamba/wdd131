// Footer dates
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

// LocalStorage Review Counter
let numReviews = Number(window.localStorage.getItem("numReviews-ls")) || 0;

numReviews++;

window.localStorage.setItem("numReviews-ls", numReviews);

document.querySelector("#reviewCount").textContent = numReviews;