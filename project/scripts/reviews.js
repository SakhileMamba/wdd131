// Reviews page: saves a review from the form and lists the saved reviews.

const reviewForm = document.querySelector("#review-form");
const movieSelect = document.querySelector("#movie");
const savedReviews = document.querySelector("#saved-reviews");
const reviewCount = document.querySelector("#review-count");
const notice = document.querySelector("#notice");

function getReviews() {
  return JSON.parse(window.localStorage.getItem("reviews-ls")) || [];
}

function saveReviews(list) {
  window.localStorage.setItem("reviews-ls", JSON.stringify(list));
}

function starRating(rating) {
  // ★ is a filled star and ☆ is an empty star.
  return `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`;
}

function reviewCard(review, index) {
  return `<article class="review-card">
      <h3>${review.title}</h3>
      <p class="rating">${starRating(review.rating)} (${review.rating} of 5)</p>
      <p>Watched on ${review.watched} by ${review.reviewer}</p>
      <p>What stood out: ${review.highlights}</p>
      <p>${review.notes}</p>
      <button class="delete-button" data-index="${index}">Delete Review</button>
    </article>`;
}

function displayReviews() {
  const list = getReviews();

  if (list.length === 0) {
    savedReviews.innerHTML = `<p class="message">You have not logged a review yet. Fill in the form and your notes will be saved here.</p>`;
    reviewCount.textContent = "0 reviews saved.";
  } else {
    let cards = "";

    list.forEach((review, index) => {
      cards += reviewCard(review, index);
    });

    savedReviews.innerHTML = cards;
    reviewCount.textContent = `${list.length} review(s) saved on this device.`;
    addDeleteButtons();
  }
}

function getHighlights() {
  const highlights = [];

  document.querySelectorAll("input[name='highlights']").forEach((box) => {
    if (box.checked) {
      highlights.push(box.value);
    }
  });

  if (highlights.length === 0) {
    return "Nothing in particular";
  } else {
    return highlights.join(", ");
  }
}

function deleteReview(index) {
  const list = getReviews();
  const removed = list.splice(index, 1);

  saveReviews(list);
  notice.textContent = `The review of ${removed[0].title} was deleted.`;
  displayReviews();
}

function addDeleteButtons() {
  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", () => {
      deleteReview(Number(button.dataset.index));
    });
  });
}

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const review = {
    title: movieSelect.value,
    rating: Number(document.querySelector("input[name='rating']:checked").value),
    watched: document.querySelector("#watched").value,
    highlights: getHighlights(),
    notes: document.querySelector("#notes").value || "No extra notes were written.",
    reviewer: document.querySelector("#reviewer").value || "Anonymous"
  };

  const list = getReviews();
  list.unshift(review);
  saveReviews(list);

  reviewForm.reset();
  displayReviews();
  notice.textContent = `Your review of ${review.title} was saved.`;
});

// The movie menu is built from the same list used on the home page.
async function fillMovieMenu() {
  const movies = await getMovies();
  const titles = movies.map((movie) => movie.title);

  titles.sort();

  titles.forEach((title) => {
    const option = document.createElement("option");
    option.setAttribute("value", title);
    option.textContent = title;
    movieSelect.appendChild(option);
  });
}

fillMovieMenu();
displayReviews();
