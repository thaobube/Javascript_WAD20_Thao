import './styles.scss';
import {movies} from  './src/data';

const app = document.getElementById('app');
console.log(movies[1].genres);


function render(array) {
    let contentHtml = '<div class="d-flex flex-wrap">';
    for (let i = 0; i < array.length; i++) {
        contentHtml += `        
        ${array[i].img ? `
        <div class="card bg-dark text-white" id="${i}" style="width: 21rem;">
        <img src="images/${array[i].imdb}.jpg" class="card-img" alt="...">
            <div class="card-img-overlay">
                <h5 class="card-title">Card title</p>
            </div>
        </div>
        ` : `
        <div class="card bg-dark text-white" id="${i}" style="width: 21rem;">
            <div class="card-img-overlay">
                <h5 class="card-title">Card title</p>
                <p class="card-title__center">${array[i].title}</p>
            </div>
        </div>
        `}        
        `;        
    }

contentHtml +='</div>';
    return contentHtml;
}
app.innerHTML = render(movies);

function popupDisplay(selectedId) {
    for (let i = 0; i < movies.length; i++) {
        if (i === selectedId) {
            let contentPopUp = `
            <div class="card fixed-center" style="width: 40rem;">
                <div class="card-body">
                    <h5 class="card-title">Title: ${movies[i].title}</h5>
                    <p class="card-text">Genres: ${movies[i].genres}</p>
                    <a href="#" class="btn btn-secondary">Fermer</a>
                </div>
            </div>
            `;
        }        
    }
}

// Event when we click to a poster
document.body.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.matches('.card-img-overlay-dark')) {
        
        console.log(e.target);
        //console.log(e.target);
    }   

});