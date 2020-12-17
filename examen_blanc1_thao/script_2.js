import './styles.scss';
import { bds } from './src/data';

const app = document.getElementById('app');

function render() {
  app.innerHTML = '';
  // Create book list section
  let booklist = '<section id = "booklist" class="card-columns">';
  for (let i = 0; i < bds.length; i++) {
    booklist += `
    <div class="card" style="width: 20rem;">
        <img class="card-img-top" src="images/${bds[i].image}" alt="Card image cap">
        <div class="card-body" id=${i}>
            <h5 class="card-title">${bds[i].titre}</h5>
            <p class="card-text">Editeur: ${bds[i].editeur}</p>
            <p class="card-text">Collection: ${bds[i].collection}</p>
            <p class="card-text">Serie: ${bds[i].serie}</p>
            <p class="card-text">Type: ${bds[i].type}</p>
            <p class="card-text">Etat: ${bds[i].etat}</p>
            <p class="card-text">Isbn: ${bds[i].isbn}</p>
            <p class="card-text">No tome: ${bds[i].no_tome}</p>
            <p class="card-text">Themes: ${bds[i].themes}</p>
            <p class="card-text">Auteurs: ${bds[i].auteurs}</p>
            <p class="card-text">Prix: ${bds[i].prix}</p>
            <p class="card-text resume">
            <span class="display-less">Resume: ${bds[i].resume.substring(0, 30)}...<button type="button" class="btn btn-outline-primary btn-more">Lire la suite</button></span>
            <span class="display-more">Resume: ${bds[i].resume}<button type="button" class="btn btn-outline-primary btn-less">Lire moins</button></span>
            </p>  
            <a href="#" class="btn btn-light borrow">Emprunter</a>          
        </div>
    </div>
    `;
  }
  booklist += '</section>';
  const titleBookList = '<h2>All of books</h2>';

  const basket = `
  <div class="basket-popup">
    <div class="basket__title">
        <i class="fas fa-shopping-basket"></i>
        <span>View your basket (0)</span>
    </div>  
    <div class="basket__content">
    </div>
  </div>
  `;
  app.innerHTML += titleBookList + basket + booklist;

  // Event when the button 'Lire la suit'/ 'Lire moins' is clicked
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('.btn-more')) {
      // console.log(e.target.parentNode);// <span class ="display-less">
      const displayLess = e.target.parentNode;
      displayLess.style.display = 'none';
      const displayMore = e.target.parentNode.parentNode.querySelector('.display-more');
      displayMore.style.display = 'inline';
    }
    if (e.target.matches('.btn-less')) {
      // console.log(e.target.parentNode);// <span class ="display-more">
      const displayMore = e.target.parentNode;
      displayMore.style.display = 'none';
      const displayLess = e.target.parentNode.parentNode.querySelector('.display-less');
      displayLess.style.display = 'inline';
    }
  });
}
render();

// Add the book into the basket
let count = 0;
const titleBasket = document.querySelector('.basket__title');
const contentBasket = document.querySelector('.basket__content');
document.body.addEventListener('click', (e) => {
  if (e.target.matches('.borrow')) {
    const { id } = e.target.parentNode;
    console.log(id);
    count += 1;
    titleBasket.innerHTML = `
        <i class="fas fa-shopping-basket"></i>
        <span>View your basket (${count})</span>
    `;
    contentBasket.innerHTML += `
        <div class="borrowedBook"><a href="#">${bds[id].titre} </a>
        </div>
    `;
  }
});
