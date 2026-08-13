const watchlistGrid = document.querySelector("#watchlist");
const watchlistCount = document.querySelector("#watchlist-count");
const notice = document.querySelector("#notice");
const clearButton = document.querySelector("#clear-watchlist");

function watchlistCard(movie) {
  return `<article class="movie-card">
      <img src="${movie.image}" alt="Movie poster for ${movie.title}" loading="lazy" width="380" height="562">
      <div class="card-text">
        <h2>${movie.title}</h2>
        <p class="meta">${movie.year} &middot; ${movie.genre.join(", ")}</p>
        <p class="rating">&#9733; ${movie.rating} / 10</p>
        <button class="remove-button" data-id="${movie.id}">Remove</button>
      </div>
    </article>`;
}

function displayWatchlist() {
  const list = getWatchlist();

  if (list.length === 0) {
    watchlistGrid.innerHTML = `<p class="message">Your watchlist is empty. Go to the <a href="index.html">home page</a> and add the movies you want to watch.</p>`;
    watchlistCount.textContent = "You have not saved any movies yet.";
    clearButton.classList.add("hide");
  } else {
    let cards = "";

    list.forEach((movie) => {
      cards += watchlistCard(movie);
    });

    watchlistGrid.innerHTML = cards;
    watchlistCount.textContent = `${list.length} movie(s) saved on this device.`;
    clearButton.classList.remove("hide");
    addPlaceholderPosters();
    addRemoveButtons();
  }
}

function removeMovie(id) {
  const list = getWatchlist();
  const movie = list.find((item) => item.id === id);

  saveWatchlist(list.filter((item) => item.id !== id));
  notice.textContent = `${movie.title} was removed from your watchlist.`;
  displayWatchlist();
}

function addRemoveButtons() {
  document.querySelectorAll(".remove-button").forEach((button) => {
    button.addEventListener("click", () => {
      removeMovie(button.dataset.id);
    });
  });
}

clearButton.addEventListener("click", () => {
  if (confirm("Remove every movie from your watchlist?")) {
    saveWatchlist([]);
    notice.textContent = "Your watchlist was cleared.";
    displayWatchlist();
  }
});

displayWatchlist();
