const searchBtn = document.getElementById("search-btn");
const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const apiKey = "98889bce";
let moviesArray = [];

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getMovies(searchInput.value);
});

async function getMovies(input) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${input}`
  );

  const data = await response.json();
  moviesArray = data.Search;
  console.log(moviesArray)
}
