// Create a function to display the 3 movies in the 10 selected in the carousel (from the current first image index)

export function innerHtmlCarousel(array, firstIndex) {
  let contentInnerHtml = '';
  contentInnerHtml += `
  <div class="carousel">
  <p class="carousel__title">Movies suggestions for you:</p>
  <div class="carousel__container">
    <div class="arrow arrow--previous">
      <i class="fas fa-angle-left"></i>
    </div>
    <div class="main-pictures">
      ${array[firstIndex].img ? `
      <img class="slideImage" src="images/${array[firstIndex].imdb}.jpg" alt="">
      ` : `
      <div class="box slideImage" style="width: 13rem; height: 19rem;">
          <p class="box__title--center">${array[firstIndex].title}</p>
      </div>
      `}
      ${array[firstIndex + 1].img ? `
      <img class="slideImage" src="images/${array[firstIndex + 1].imdb}.jpg" alt="">
      ` : `
      <div class="box slideImage" style="width: 13rem; height: 19rem;">
          <p class="box__title--center">${array[firstIndex + 1].title}</p>
      </div>
      `}
      ${array[firstIndex + 2].img ? `
      <img class="slideImage" src="images/${array[firstIndex + 2].imdb}.jpg" alt="">
      ` : `
      <div class="box slideImage" style="width: 13rem; height: 19rem;">
          <p class="box__title--center">${array[firstIndex + 2].title}</p>
      </div>
      `}
    </div>
    <div class="arrow arrow--next">
      <i class="fas fa-angle-right"></i>
    </div>
  </div>
  </div>
  `;
  return contentInnerHtml;
}
// Content of the carousel element
export function renderCarousel(array, firstIndex) {
  const carouselElement = `
  <div id="carousel">
  ${innerHtmlCarousel(array, firstIndex)}
  </div> 
`;
  return (carouselElement);
}

// Create a function to change the 3 movies when clicking to next/previous arrow
let currentFirstIndex = 0;
let contentInnerHtml = '';
export function nextSlide(array) {
  if (currentFirstIndex <= 6) {
    currentFirstIndex += 1;
    contentInnerHtml = innerHtmlCarousel(array, currentFirstIndex);
  } else {
    contentInnerHtml = innerHtmlCarousel(array, currentFirstIndex);
  }
  return contentInnerHtml;
}
export function previousSlide(array) {
  if (currentFirstIndex >= 1) {
    currentFirstIndex -= 1;
    contentInnerHtml = innerHtmlCarousel(array, currentFirstIndex);
  } else {
    contentInnerHtml = innerHtmlCarousel(array, currentFirstIndex);
  }
  return contentInnerHtml;
}
