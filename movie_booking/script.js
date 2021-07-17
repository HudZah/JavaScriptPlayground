const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

populateSelectedMovieData();

// Save selected movie index and price to local storage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


// Update total and count 
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    console.log(seatsIndex);

    const selectedSeatsCount = selectedSeats.length

    count.innerHTML = selectedSeatsCount;
    total.innerHTML = "$" + selectedSeatsCount * movieSelect.value;
}

// Get data from local storage and populate UI
function populateSelectedMovieData() {
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    const selectedSeats = localStorage.getItem('selectedSeats');
    const selectedSeatsIndex = JSON.parse(selectedSeats);

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeatsIndex.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedSeatsCount = selectedSeatsIndex.length;

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Event listener when we change to another movie
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

container.addEventListener('click', (e) => {
    // Shows element of what was clicked
    if(e.target.classList.contains('seat') && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// Initial count and total set
updateSelectedCount();