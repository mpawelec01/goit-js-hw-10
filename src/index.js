import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.style.visibility = 'hidden';
error.style.visibility = 'hidden';

window.onload = () => {
  Notiflix.Loading.standard('Loading data, please wait...', {
    backgroundColor: 'rgba(0,0,0,0.6)',
  });
  fetchBreeds()
    .then(breeds => {
      Notiflix.Loading.remove();
      let select = new SlimSelect({
        select: breedSelect,
        data: breeds.map(breed => ({
          text: breed.name,
          value: breed.id,
        })),
      });
      breedSelect.addEventListener('change', event => {
        displayCatInfo(event.target.value);
      });
    })
    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
};

const displayCatInfo = breedId => {
  Notiflix.Loading.standard('Loading data, please wait...', {
    backgroundColor: 'rgba(0,0,0,0.6)',
  });
  fetchCatByBreed(breedId)
    .then(cat => {
      Notiflix.Loading.remove();
      catInfo.innerHTML = `<img src='${cat.url}' alt='${cat.breeds[0].name}'/>
        <div class='cat-description'>
        <h2>${cat.breeds[0].name}</h2>
        <p>${cat.breeds[0].description}</p>
        <p>${cat.breeds[0].temperament}</p>
        </div>`;
    })
    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
};
