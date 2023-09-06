const searchBtn = document.getElementById("search-btn");
const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const mainContainer = document.getElementById("main-container");

const apiKey = "98889bce";
let movieIDs;

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getMovieIds(searchInput.value);
});

async function getMovieIds(input) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${input}`
  );

  const data = await response.json();
  movieIDs = data.Search.map((movie) => movie.imdbID);
  getMovieDetails(movieIDs);
}

function getMovieDetails(arr) {
  mainContainer.innerHTML = ``;

  arr.forEach(async (imdbID) => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`
    );
    const data = await response.json();
    mainContainer.innerHTML += `
    <article class="search-result">
    <img
      alt="${data["Title"]} poster"
      class="movie-poster"
      src="${data["Poster"]}"
    />
    <div class="movie-info">
      <div class="movie-header">
        <h3 class="movie-title">${data["Title"]}</h3>
      </div>
      <div class="movie-subinfo">
        <p class="runtime">${data["Runtime"]}</p>
        <p class="genre">${data["Genre"]}</p>
        <button class="add-to-watchlist">Watchlist</button>
      </div>
      <p class="plot">
      ${data["Plot"]}
      </p>
    </div>
  </article>`;
  });
}
