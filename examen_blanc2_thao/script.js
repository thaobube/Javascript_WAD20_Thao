import './styles.scss';
import { movies } from './src/data/data';
import {
  recentMovies, thrillerDramaMovies, scienceFictionFantasyMovies, actionMovies, documentaryMovies, descAllMovies, ascAllMovies, descThrillerMovies, ascThrillerMovies, descScienceMovies, ascScienceMovies, descActionMovies, ascActionMovies, descDocumentaryMovies, ascDocumentaryMovies, randomMaxTenMovies, suggestMovies,
} from './src/helpers/filterMovies';
import { mergeStringArray } from './src/helpers/functions';
import { header } from './src/views/header';
import {
  innerHtmlCarousel, renderCarousel, nextSlide, previousSlide,
} from './src/views/carousel';
import { selection } from './src/views/selection';
import { renderMain, innerHtmlMain } from './src/views/main';

// -----------------------------------------------------------

const app = document.getElementById('app');

// list of 10 randome movies from the original database 'movies' to show in the carousel
const randomTenGeneralMovies = randomMaxTenMovies(movies);

app.innerHTML = header + renderCarousel(randomTenGeneralMovies, 0) + selection + renderMain(movies);

const carousel = document.getElementById('carousel');
// console.log(carousel);

// Display all movies when first loading the web
// app.innerHTML += renderMain(movies);
const main = document.getElementById('main');
// console.log(main);

// Event when we click to the button 'All', 'Recent film only'
document.body.addEventListener('click', (e) => {
  if (e.target.matches('.btn-recent')) {
    main.innerHTML = innerHtmlMain(recentMovies);
  }
  if (e.target.matches('.btn-all')) {
    main.innerHTML = innerHtmlMain(movies);
  }
});

// function to display movies when sorting by notes:
function sortingByNotes(array1, array2) {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('#sortField')) {
      if (parseInt(e.target.value) === 1) {
        main.innerHTML = innerHtmlMain(array1);
        console.log(e.target.value);
      }
      if (parseInt(e.target.value) === 2) {
        main.innerHTML = innerHtmlMain(array2);
        console.log(e.target.value);
      }
    }
  });
}
// Event when we select by genre & by notes (the selection by genre is still active)
document.body.addEventListener('click', (e) => {
  if (e.target.matches('#selectField')) {
    if (parseInt(e.target.value) === 1) {
      main.innerHTML = innerHtmlMain(movies);
      console.log(e.target.value);
      sortingByNotes(descAllMovies, ascAllMovies);
    }
    if (parseInt(e.target.value) === 2) {
      main.innerHTML = innerHtmlMain(thrillerDramaMovies);
      console.log(e.target.value);
      sortingByNotes(descThrillerMovies, ascThrillerMovies);
    }
    if (parseInt(e.target.value) === 3) {
      main.innerHTML = innerHtmlMain(scienceFictionFantasyMovies);
      console.log(e.target.value);
      sortingByNotes(descScienceMovies, ascScienceMovies);
    }
    if (parseInt(e.target.value) === 4) {
      main.innerHTML = innerHtmlMain(actionMovies);
      console.log(e.target.value);
      sortingByNotes(descActionMovies, ascActionMovies);
    }
    if (parseInt(e.target.value) === 5) {
      main.innerHTML = innerHtmlMain(documentaryMovies);
      console.log(e.target.value);
      sortingByNotes(descDocumentaryMovies, ascDocumentaryMovies);
    }
  }
});

// Event when we click to a poster => show the popup
document.body.addEventListener('click', (e) => {
  if (e.target.matches('.box__click')) {
    const selectedBoxPopUp = e.target.parentNode.parentNode;
    // display the Pop Up in the fix position
    const selectedPopUpFix = selectedBoxPopUp.querySelector('.fixed-center-popup--hidden');
    selectedPopUpFix.classList.remove('fixed-center-popup--hidden');
    selectedPopUpFix.classList.add('fixed-center-popup');
    // display the overlay
    const selectedOverlay = selectedBoxPopUp.querySelector('.overlay--hidden');
    selectedOverlay.classList.remove('overlay--hidden');
    selectedOverlay.classList.add('overlay');
  }
});

// Event when we click to the button 'Close' - hide the popup
document.body.addEventListener('click', (e) => {
  if (e.target.matches('.btn-close')) {
    const selectedBoxPopUp = e.target.parentNode.parentNode.parentNode.parentNode;
    // hide the Pop Up in the fix position
    const selectedPopUpFix = selectedBoxPopUp.querySelector('.fixed-center-popup');
    selectedPopUpFix.classList.remove('fixed-center-popup');
    selectedPopUpFix.classList.add('fixed-center-popup--hidden');
    // hide the overlay
    const selectedOverlay = selectedBoxPopUp.querySelector('.overlay');
    selectedOverlay.classList.remove('overlay');
    selectedOverlay.classList.add('overlay--hidden');
  }
});

// console.log(randomTenGeneralMovies);

// Event when clicking to next/previous arrow (by default: the array is randomTenGeneralMovies)
function displayCarousel() {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('.fa-angle-right')) {
      carousel.innerHTML = nextSlide(randomTenGeneralMovies);
    }
  });
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('.fa-angle-left')) {
      carousel.innerHTML = previousSlide(randomTenGeneralMovies);
    }
  });
}
displayCarousel();

// Event when clicking on the heart: empty heart <=> filled hear + change the carousel display
document.body.addEventListener('click', (e) => {
  if (e.target.matches('.far')) {
    e.target.classList.toggle('fas');
    // get all the filled hearts
    const clickedHearts = document.querySelectorAll('.fas.fa-heart');
    // Check if there is any filled hearts
    if (clickedHearts.length > 0) {
      // get a new array of genre based on clicked hearts
      const clickedGenres = [];
      for (const clickedHeart of clickedHearts) {
        const boxPopupElement = clickedHeart.parentNode.parentNode.parentNode.parentNode;
        const clickedGenre = boxPopupElement.querySelector('.genre').innerHTML;
        clickedGenres.push(clickedGenre);
      }
      // console.log(likedGenres); // example: ["Thriller,Drama", "Thriller,Drama,Crime", "Biography,Drama,History"] => array of string
      // get the unique list of liked genre
      const likedGenres = mergeStringArray(clickedGenres);
      console.log(likedGenres); // example: ["Thriller", "Drama", "Crime", "Comedy", "Romance"]
      // new array of movies that contain the liked genre as in the list from the database 'movies'
      const suggestFavoriteMovies = suggestMovies(likedGenres);
      // Get the max 10 random unique movies from the array above
      const randomTenFavoriteMovies = randomMaxTenMovies(suggestFavoriteMovies);
      console.log(randomTenFavoriteMovies);
      // Display new carousel
      carousel.innerHTML = renderCarousel(randomTenFavoriteMovies, 0);
      console.log(carousel);
      // Event when clicking to next/previous arrow:
      document.body.addEventListener('click', (e) => {
        if (e.target.matches('.fa-angle-right')) {
          carousel.innerHTML = nextSlide(randomTenFavoriteMovies);
        }
      });
      document.body.addEventListener('click', (e) => {
        if (e.target.matches('.fa-angle-left')) {
          carousel.innerHTML = previousSlide(randomTenFavoriteMovies);
        }
      });
    } else {
      // if there is no filled heart => display as default with ten general movies
      carousel.innerHTML = innerHtmlCarousel(randomTenGeneralMovies, 0);
      displayCarousel();
      console.log(randomTenGeneralMovies);
    }
  }
});
