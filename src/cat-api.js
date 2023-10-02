import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_cIwzl2PRe5BIwhyBN3L5UJtZCoalrqqqUhi8roQoy9spydQSswh1dD2vZFXMdc5X';

const fetchBreeds = () => {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      throw error;
    });
};

const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      throw error;
    });
};

export { fetchBreeds, fetchCatByBreed };
