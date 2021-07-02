const toggleButton = document.getElementById('show-more');
const toggleInnerName = document.querySelector('.more-less');
const refreshButton = document.getElementById('refresh');
const dayContainer = document.getElementById('day-info');
const zoneContainer = document.getElementById('zone-container');

const city = document.getElementById('city');
const greeting = document.getElementById('day-heading');
const clock = document.getElementById('clock');
const timezone = document.getElementById('timezone');
const dayOfYear = document.getElementById('day-year');
const dayOfWeek = document.getElementById('day-week');
const weekNumber = document.getElementById('week-of-year');
const quoteContainer = document.getElementById('quote-container');
const quote = document.getElementById('quote');
const author = document.getElementById('quote-author');
const locationContainer = document.getElementById('location');

const time = new Date();

function toggleView() {
    if (toggleInnerName.innerHTML === 'MORE') {
        toggleInnerName.innerHTML = 'LESS';
    } else {
        toggleInnerName.innerHTML = 'MORE';
    }

    dayContainer.classList.toggle('more');
    quoteContainer.classList.toggle('more');
    locationContainer.classList.toggle('more');
}

function setBackground() {
    const hours = time.getHours();
    console.log(hours);
    // check the time and window size to display the correct background
    window.addEventListener('resize', () => {
        if (hours <= 12 && window.innerWidth > 375) {
            document.body.style.backgroundImage =
                "url('/Users/DanielJ/Desktop/Desktop/Coding-Projects/Courses/Website-Portfolio/Clock-App/resources/images/desktop/bg-image-daytime.jpg')";
        } else if (hours <= 12 && window.innerWidth <= 375) {
            document.body.style.backgroundImage =
                "url('/Users/DanielJ/Desktop/Desktop/Coding-Projects/Courses/Website-Portfolio/Clock-App/resources/images/mobile/bg-image-daytime.jpg')";
        } else if (hours > 12 && window.innerWidth <= 375) {
            document.body.style.backgroundImage =
                "url('/Users/DanielJ/Desktop/Desktop/Coding-Projects/Courses/Website-Portfolio/Clock-App/resources/images/mobile/bg-image-nighttime.jpg')";
        } else {
            document.body.style.backgroundImage =
                "url('/Users/DanielJ/Desktop/Desktop/Coding-Projects/Courses/Website-Portfolio/Clock-App/resources/images/desktop/bg-image-nighttime.jpg')";
        }
    });
}

function setGreeting() {
    const hours = time.getHours();

    if (hours < 12) {
        greeting.innerText = 'Good Morning';
    } else if (hours > 12 && hours <= 17) {
        greeting.innerText = 'Good Day';
    } else {
        greeting.innerText = 'Good Evening';
    }
}

function fetchQuote() {
    const url = 'https://api.quotable.io/random';

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            quote.innerText = data.content;
            author.innerText = data.author;
        });
}

function fetchDayInformation() {
    const ipURL = 'https://freegeoip.app/json/';

    let dayInfo = {};

    dayInfo = fetch(ipURL)
        .then((res) => res.json())
        .then((data) => {
            const fetchedIP = data.ip;
            city.innerText = data.city;
            const worldTimeURL = `http://worldtimeapi.org/api/ip/${fetchedIP}`;
            return fetch(worldTimeURL)
                .then((res) => res.json())
                .then((data) => {
                    zoneContainer.innerText = data.timezone;
                    dayOfYear.innerText = data.day_of_year;
                    dayOfWeek.innerText = data.day_of_week;
                    weekNumber.innerText = data.week_number;
                    const time = data.datetime;
                    const splicedTime = time.substring(11, 16);
                    clock.innerText = splicedTime;
                    timezone.innerText = data.abbreviation;
                });
        });
}

toggleButton.addEventListener('click', toggleView);
refreshButton.addEventListener('click', fetchQuote);

setBackground();
setGreeting();
fetchQuote();
fetchDayInformation();
