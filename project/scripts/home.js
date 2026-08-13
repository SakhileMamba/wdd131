// Home page: loads the movie list and filters it.

const movieGrid = document.querySelector("#movie-list");
const resultCount = document.querySelector("#result-count");
const notice = document.querySelector("#notice");
const filterForm = document.querySelector("#filter-form");
const searchInput = document.querySelector("#search");
const yearSelect = document.querySelector("#year");
const genreSelect = document.querySelector("#genre");
const ratingSelect = document.querySelector("#rating");

let allMovies = [];

// A movie that is already saved gets a remove button instead of an add button.
function watchlistButton(movie) {
  const list = getWatchlist();
  const saved = list.find((item) => item.id === movie.id);

  if (saved) {
    return `<button class="watchlist-button saved" data-id="${movie.id}">Remove from Watchlist</button>`;
  } else {
    return `<button class="watchlist-button" data-id="${movie.id}">+ Add to Watchlist</button>`;
  }
}

function movieCard(movie) {
  return `<article class="movie-card">
      <img src="${movie.image}" alt="Movie poster for ${movie.title}" loading="lazy" width="380" height="562">
      <div class="card-text">
        <h2>${movie.title}</h2>
        <p class="meta">${movie.year} &middot; ${movie.genre.join(", ")}</p>
        <p class="rating">&#9733; ${movie.rating} / 10</p>
        <p>${movie.description}</p>
        ${watchlistButton(movie)}
      </div>
    </article>`;
}

function displayMovies(list) {
  if (list.length === 0) {
    movieGrid.innerHTML = `<p class="message">No movies match those filters. Try a wider search.</p>`;
  } else {
    let cards = "";

    list.forEach((movie) => {
      cards += movieCard(movie);
    });

    movieGrid.innerHTML = cards;
    addPlaceholderPosters();
    addWatchlistButtons();
  }

  resultCount.textContent = `Showing ${list.length} of ${allMovies.length} movies`;
}

// Every genre in the list is added to the genre menu once.
function fillGenreMenu(list) {
  const genres = [];

  list.forEach((movie) => {
    movie.genre.forEach((name) => {
      if (!genres.includes(name)) {
        genres.push(name);
      }
    });
  });

  genres.sort();

  genres.forEach((name) => {
    const option = document.createElement("option");
    option.setAttribute("value", name);
    option.textContent = name;
    genreSelect.appendChild(option);
  });
}

function matchesDecade(movie, choice) {
  if (choice === "2010") {
    return movie.year >= 2010;
  } else if (choice === "2000") {
    return movie.year >= 2000 && movie.year <= 2009;
  } else if (choice === "1990") {
    return movie.year >= 1990 && movie.year <= 1999;
  } else if (choice === "1980") {
    return movie.year >= 1980 && movie.year <= 1989;
  } else if (choice === "older") {
    return movie.year < 1980;
  } else {
    return true;
  }
}

// Each menu narrows the list down a little more.
function filterMovies() {
  const words = searchInput.value.toLowerCase();
  let list = allMovies.filter((movie) => movie.title.toLowerCase().includes(words));

  list = list.filter((movie) => matchesDecade(movie, yearSelect.value));

  if (genreSelect.value !== "all") {
    list = list.filter((movie) => movie.genre.includes(genreSelect.value));
  }

  list = list.filter((movie) => Number(movie.rating) >= Number(ratingSelect.value));

  return list;
}

// The same button adds the movie or takes it off again.
function toggleWatchlist(button) {
  const movie = allMovies.find((item) => item.id === button.dataset.id);
  const list = getWatchlist();
  const saved = list.find((item) => item.id === movie.id);

  if (saved) {
    saveWatchlist(list.filter((item) => item.id !== movie.id));
    button.textContent = "+ Add to Watchlist";
    button.classList.remove("saved");
    notice.textContent = `${movie.title} was removed from your watchlist.`;
  } else {
    list.push({
      id: movie.id,
      title: movie.title,
      year: movie.year,
      genre: movie.genre,
      rating: movie.rating,
      image: movie.image
    });
    saveWatchlist(list);
    button.textContent = "Remove from Watchlist";
    button.classList.add("saved");
    notice.textContent = `${movie.title} was added to your watchlist.`;
  }
}

function addWatchlistButtons() {
  document.querySelectorAll(".watchlist-button").forEach((button) => {
    button.addEventListener("click", () => {
      toggleWatchlist(button);
    });
  });
}

filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  displayMovies(filterMovies());
});

searchInput.addEventListener("input", () => {
  displayMovies(filterMovies());
});

yearSelect.addEventListener("change", () => {
  displayMovies(filterMovies());
});

genreSelect.addEventListener("change", () => {
  displayMovies(filterMovies());
});

ratingSelect.addEventListener("change", () => {
  displayMovies(filterMovies());
});

document.querySelector("#clear-filters").addEventListener("click", () => {
  searchInput.value = "";
  yearSelect.value = "all";
  genreSelect.value = "all";
  ratingSelect.value = "0";
  displayMovies(allMovies);
});

async function startPage() {
  movieGrid.innerHTML = `<p class="message">Loading movies...</p>`;
  allMovies = await getMovies();
  fillGenreMenu(allMovies);
  displayMovies(allMovies);
}

startPage();
