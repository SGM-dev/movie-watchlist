const searchBtn = document.getElementById("search-btn");
const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const mainContainer = document.getElementById("main-container");

const apiKey = "98889bce";
let imdbIDArray = [];

searchBtn.addEventListener("click", getMovies);

async function getMovieIds(input) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${input}`
  );

  const data = await response.json();
  movieIDs = data.Search.map((movie) => movie.imdbID);
  renderMovieDetails(movieIDs);
}

async function getMovies(e) {
  e.preventDefault();
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`
  );

  const data = await response.json();

  if (data.Search) {
    for (let i = 0; i < data.Search.length; i++) {
      imdbIDArray.push(data.Search[i].imdbID);
      renderMovieDetails(imdbIDArray);
    }
  } else {
    mainContainer.innerHTML = `
      <div class="initial-state">
        <img alt="film-icon" src="/film.svg" class="film-icon" />
        <h3 class="help-text">Unable to find what you’re looking for. Please try another search.</h3>
      </div>`;
  }
}

function renderMovieDetails(idArray) {
  idArray.forEach(async (id) => {
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
      <button class="add-to-watchlist" data-imdbId=${data.imdbID}>
      <i class="fa-solid fa-circle-plus"></i>Watchlist
    </button>
    </div>
    <p class="plot">
    ${data.Plot}
    </p>
  </div>
</article>`;
    }
    imdbIDArray = [];
  });
  searchInput.value = "";
  mainContainer.innerHTML = "";
}

const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

function addToWatchlist(id) {
  if (!watchlist.includes(id)) {
    watchlist.push(id);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
}

document.addEventListener("click", (e) => {
  if(e.target.dataset.imdbid) {
    addToWatchlist(e.target.dataset.imdbid)
  }
})