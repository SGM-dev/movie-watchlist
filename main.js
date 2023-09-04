const searchBtn = document.getElementById("search-btn");
const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

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
  console.log(movieIDs)
}
