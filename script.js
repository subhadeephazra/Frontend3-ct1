const form = document.getElementById("form");
const container = document.getElementById("main");
const loader = document.getElementById("loader");

//Event for form
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const api = form["api"].value;
    const movie = form["movie"].value;
    form.reset();
    movieList(api, movie);
});

//Function to fetch API
async function movieList(api, movie) {
    container.innerHTML = "";
    loader.classList.remove("hide");
    const url = `https://www.omdbapi.com/?i=tt3896198&apikey=${api}&s=${movie}`;
    try {
        const response = await fetch(url);
        const movieDetail = await response.json();
        console.log(movieDetail);
        if (movieDetail.Response === 'True') {
            loader.classList.add("hide");
            for (let i = 0; i < movieDetail.Search.length; i++) {
                makeCard(movieDetail.Search[i], i);
            }
        } else {
            alert(movieDetail.Error);
            loader.classList.add("hide");
            movieList('f0a86a6e', '');
        };
    } catch (error) {
        console.log(error);
        alert("             Welcome to IMDB Movie App, click OK to continue.             hint : API_KEY: f0a86a6e");
        loader.classList.add("hide");
    }
}
movieList('f0a86a6e', '');
/*  ********************************Below codes are for pagination to get more than 10 search results*********************************
async function movieList(api, movie, page = 1, maxResults = 10) {
    container.innerHTML = "";
    loader.classList.remove("hide");
    const url = `https://www.omdbapi.com/?i=tt3896198&apikey=${api}&s=${movie}&page=${page}`;

    try {
        const response = await fetch(url);
        const movieDetail = await response.json();
        console.log(movieDetail);

        if (movieDetail.Response === 'True') {
            loader.classList.add("hide");
            const totalResults = parseInt(movieDetail.totalResults);

            for (let i = 0; i < movieDetail.Search.length; i++) {
                makeCard(movieDetail.Search[i], i);
            }

            // Check if there are more results to fetch
            if ((page - 1) * maxResults + movieDetail.Search.length < totalResults) {
                const nextPage = page + 1;
                movieList(api, movie, nextPage, maxResults);
            }
        } else {
            alert(movieDetail.Error);
            loader.classList.add("hide");
        }
    } catch (error) {
        console.log(error);
        alert("Welcome to IMDB Movie App, click OK to continue");
        loader.classList.add("hide");
    }
}

movieList('244f433d', '', 1, 30); // Fetches up to 30 results (3 pages with 10 results each)

 */

// For Making Card
function makeCard(movieDetail, index) {
    const card = document.createElement("div");
    card.className = "card";
    card.addEventListener('click', function () {
        location.href = `https://www.imdb.com/title/${movieDetail.imdbID}`;
    });
    card.innerHTML = `
        <img src="${movieDetail.Poster}" alt="${movieDetail.Title}">
        <h1>${movieDetail.Title},${movieDetail.Year}</h1>
        <p>${index + 1}</p>
    `;
    container.append(card);
}

