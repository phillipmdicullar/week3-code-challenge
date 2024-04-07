// URL for fetching movie data
let url = 'http://localhost:3000/films';
// Reference to the element that holds the list of movies
const listHolder = document.getElementById('films');

// Event listener to execute when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Remove the placeholder movie item
    document.querySelector('.film.item').remove();
    // Fetch movies data from the API
    getMovies(url);
});

// Function to fetch movies data from the API
function getMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            // Process fetched movies
            movies.forEach(displayMovie);
            // Add click event listener to each movie item
            onClick();
        })
        .catch(error => console.error('Error fetching movies:', error));
}

// Function to display a movie in the list
function displayMovie(movie) {
    // Create a list item for the movie
    const li = document.createElement('li');
    // Set cursor style to pointer
    li.style.cursor = "pointer";
    // Set the text content of the list item to the movie title in uppercase
    li.textContent = (movie.title).toUpperCase();
    // Append the list item to the list holder element
    listHolder.appendChild(li);
}

// Function to add click event listener to each movie item
function onClick() {
    let children = listHolder.children;

    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        child.addEventListener('click', () => {
            // Fetch details of the clicked movie
            fetch(`${url}/${i + 0}`)
                .then(res => res.json())
                .then(movie => {
                    // Update "Buy Ticket" button text
                    document.getElementById('buy-ticket').textContent = 'Buy Ticket';
                    // Set up movie details
                    setUpMovieDetails(movie);
                })
                .catch(error => console.error('Error fetching movie details:', error));
        });
    }
}

// Function to set up movie details on the page
function setUpMovieDetails(details) {
    const { poster, title, runtime, description, showtime, capacity, tickets_sold } = details;
    document.getElementById('poster').src = poster;
    document.querySelector('#title').textContent = title;
    document.querySelector('#runtime').textContent = `${runtime} minutes`;
    document.querySelector('#film-info').textContent = description;
    document.querySelector('#showtime').textContent = showtime;
    document.querySelector('#ticket-num').textContent = capacity - tickets_sold;
}

// Reference to the "Buy Ticket" button
const btn = document.getElementById('buy-ticket');
// Event listener for "Buy Ticket" button click
btn.addEventListener('click', function(e) {
    // Get remaining tickets count
    let leftTickets = document.querySelector('#ticket-num').textContent;
    e.preventDefault();
    // Decrement remaining tickets count if available, else indicate sold out
    if (leftTickets > 0) {
        document.querySelector('#ticket-num').textContent = leftTickets - 1;
    } else if (parseInt(leftTickets, 10) === 0) {
        btn.textContent = 'Sold Out';
    }
});
