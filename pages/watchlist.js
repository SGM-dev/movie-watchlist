const mainContainer = document.getElementById("main-container");

const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
const apiKey = "98889bce";

function renderWatchlist() {
  if (watchlist.length > 0) {
    mainContainer.innerHTML = "";
    watchlist.forEach(async (id) => {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
      );
      const data = await response.json();
      if (data.Rated != "N/A" && data.Runtime != "N/A") {
        mainContainer.innerHTML += `
    <article class="search-result">
    <img
      alt="${data.Title} poster"
      class="movie-poster"
      src="${data.Poster}"
    />
    <div class="movie-info">
      <div class="movie-header">
        <h3 class="movie-title">${data.Title}</h3>
        <div class="rating">
        <i class="fa-solid fa-star"></i>
        <p>${data.imdbRating}</p>
      </div>
      </div>
      <div class="movie-subinfo">
        <p class="runtime">${data.Runtime}</p>
        <p class="genre">${data.Genre}</p>
        <button class="remove-from-watchlist" data-imdbId=${data.imdbID}>
        <i class="fa-solid fa-circle-minus"></i>Remove
      </button>
      </div>
      <p class="plot">
      ${data.Plot}
      </p>
    </div>
  </article>`;
      }
    });
  }
}

renderWatchlist();
