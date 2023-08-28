import Notiflix from 'notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import CatAPIService from './cat-api.js';
import SlimSelect from 'slim-select';

const CatAPI = new CatAPIService();

const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');

createSelectOptions()
  .then(options => {
    select.classList.remove('is-hidden');
    new SlimSelect({
      select: select,
      data: options,
      settings: {
        placeholderText: 'Choose one',
        hideSelected: true,
      },
      events: {
        afterChange: onChange,
      },
    });
  })
  .catch(() =>
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    )
  );

function createSelectOptions() {
  Loading.circle();
  return CatAPI.fetchBreeds()
    .then(data =>
      data.map(({ id, name }) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = name;
        return option;
      })
    )
    .finally(Loading.remove);
}

function onChange(select) {
  Loading.circle();
  CatAPI.fetchCatByBreed(select[0].value)
    .then(data => {
      renderCatInfo({
        img: data[0].url,
        name: data[0].breeds[0].name,
        desc: data[0].breeds[0].description,
        temp: data[0].breeds[0].temperament,
      });
    })
    .catch(() => {
      catInfo.innerHTML = '';
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(Loading.remove);
}

function renderCatInfo({ img, name, desc, temp }) {
  catInfo.innerHTML = `<img src="${img}" alt="cat" width="700">
    <div class="text-wrap">
        <h2>${name}</h2>
        <p>${desc}</p>
        <p>${temp}</p>
    </div>`;
}
