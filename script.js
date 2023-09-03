// Constants
const API_KEY = '53FCrHIIH7uAD1nfKUMecHC1Sy19YQyFDccf0CBg'; 
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentImageContainer = document.getElementById('current-image-container');
const searchHistoryList = document.getElementById('search-history');

// Event Listener: Submitting the search form
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const selectedDate = searchInput.value;
    getImageOfTheDay(selectedDate);
});

// Event Listener: Clicking the "Current Picture" button
currentImageContainer.addEventListener('click', function (e) {
    e.preventDefault();
    getCurrentImageOfTheDay();
});
// Function: Fetch data for the current date from the NASA API
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split('T')[0];
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${currentDate}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayImage(data);
        })
        .catch((error) => {
            console.error('Error fetching current image:', error);
            // Handle and display error to the user
        });
}

// Function: Fetch data for the selected date from the NASA API
function getImageOfTheDay(selectedDate) {
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayImage(data);
            saveSearch(selectedDate);
            addSearchToHistory();
        })
        .catch((error) => {
            console.error('Error fetching image for selected date:', error);
            // Handle and display error to the user
        });
}

// Function: Display the image data in the UI
function displayImage(data) {
    currentImageContainer.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="${data.title}">
        <p>${data.explanation}</p>
    `;
}

// Function: Save the selected date to local storage
function saveSearch(selectedDate) {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(selectedDate);
    localStorage.setItem('searches', JSON.stringify(searches));
}

// Function: Add search history to the UI
function addSearchToHistory() {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searchHistoryList.innerHTML = '';

    searches.forEach((date) => {
        const listItem = document.createElement('li');
        listItem.textContent = date;
        listItem.addEventListener('click', () => {
            getImageOfTheDay(date);
        });
        searchHistoryList.appendChild(listItem);
    });
}

// Initial page load: Display current image of the day
getCurrentImageOfTheDay();
addSearchToHistory();

