document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Hamburger navigation for small screens
const navButton = document.querySelector("#nav-button");
const navMenu = document.querySelector("#nav-menu");

navButton.addEventListener("click", () => {
  navButton.classList.toggle("show");
  navMenu.classList.toggle("show");
  navButton.setAttribute("aria-expanded", navButton.classList.contains("show"));
});

// The movie data comes from the IMDb Top 100 Movies API on RapidAPI.
const apiUrl = "https://imdb-top-100-movies.p.rapidapi.com/";
const apiOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "1fd22aa7damsh9d9ad651cac54b2p127909jsn689266f1610c",
    "x-rapidapi-host": "imdb-top-100-movies.p.rapidapi.com"
  }
};

async function getMovies() {
  try {
    const response = await fetch(apiUrl, apiOptions);
    if (!response.ok) {
      throw new Error(`The API answered with a status of ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // If the API is down or the daily quota runs out the pages still work
    // because a copy of the same list is saved in data/movies.json.
    console.log(`Loading the saved movie list instead: ${error.message}`);
    const backup = await fetch("data/movies.json");
    return await backup.json();
  }
}

// IMDb has does not have some movie posters, any picture that does
// not load is replaced by a placeholder.
const placeholderPoster = "images/no-poster.png";

function addPlaceholderPosters() {
  document.querySelectorAll(".movie-card img").forEach((image) => {
    image.onerror = () => {
      image.src = placeholderPoster;
      image.alt = "The poster for this movie is not available";
    };
  });
}

// The watchlist is kept in localStorage so it survives a refresh.
function getWatchlist() {
  return JSON.parse(window.localStorage.getItem("watchlist-ls")) || [];
}

function saveWatchlist(list) {
  window.localStorage.setItem("watchlist-ls", JSON.stringify(list));
}
