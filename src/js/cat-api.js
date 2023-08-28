import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] = 'live_6HCwGVvOYhQuGTVjjmmI7PXPkr65w7NyDh9nrQSTY3aa9f5jLGf6revUs3JtOBc4';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

export default class CatAPIService {
  fetchBreeds() {
    return axios
      .get('breeds')
      .then(res => res.data)
      .catch(() =>
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        )
      );
  }

  fetchCatByBreed(breedId) {
    return axios
      .get(`images/search?breed_ids=${breedId}`)
      .then(res => res.data)
      .catch(() =>
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        )
      );
  }
}

// export function fetchBreeds() {
//   return axios.get('https://api.thecatapi.com/v1/breeds');
// }

// export function fetchCatByBreed(breedId) {
//   return axios.get(
//     `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
//   );
// }
