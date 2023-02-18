import axios from 'axios';
import Notiflix from 'notiflix';
import PicturesApiService from './class';
import LoadMoreBtn from './LoadMoreBtn';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const art = new SimpleLightbox('.gallery a', {
  captionsDelay: 250,
});

const form = document.querySelector('.search-form');
const input = document.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.load-more');

form.addEventListener('submit', onFormClick);
button.addEventListener('click', fetchHits);

const picturesApiService = new PicturesApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', isHidden: true });

function onFormClick(event) {
  event.preventDefault();
  const inputValue = input.value;
  picturesApiService.query = inputValue;
  clear();
  picturesApiService.resetPage();
  loadMoreBtn.show();

  fetchHits().finally(() => form.reset());
}

async function fetchHits() {
  loadMoreBtn.disable();

  try {
    const data = await picturesApiService.getPictures();
    const hits = data.hits;
    const totalHits = data.totalHits;

    console.log(totalHits);
    console.log('hits:', hits);
    if (hits.length === 0 || picturesApiService.query === '') {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.hide();
      return;
    }
    // Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    console.log(picturesApiService.page);
    if (picturesApiService.page === Math.ceil(totalHits / 100)) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.hide();
    }
    const markup = hits
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `
          <a href="${largeImageURL}">
           <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes<br> 
            ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views<br> 
            ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments<br> 
            ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads<br> 
            ${downloads}</b>
          </p>
        </div>
      </div>
          </a>
          `
      )
      .join('');
    gallery.insertAdjacentHTML('beforeend', markup);

    art.refresh();
    loadMoreBtn.enable();
  } catch (error) {
    onError(error);
  }
  // return picturesApiService
  //   .getPictures()
  //   .then(hits => {
  //     if (hits.length === 0) throw new Error('No data');
  //     const markup = hits
  //       .map(
  //         ({
  //           webformatURL,
  //           largeImageURL,
  //           tags,
  //           likes,
  //           views,
  //           comments,
  //           downloads,
  //         }) =>
  //           `

  //       <div class="photo-card">
  //     <img src="${webformatURL}, ${largeImageURL}" alt="${tags}" loading="lazy" />
  //     <div class="info">
  //       <p class="info-item">
  //         <b>Likes: ${likes}</b>
  //       </p>
  //       <p class="info-item">
  //         <b>Views: ${views}</b>
  //       </p>
  //       <p class="info-item">
  //         <b>Comments: ${comments}</b>
  //       </p>
  //       <p class="info-item">
  //         <b>Downloads: ${downloads}</b>
  //       </p>
  //     </div>
  //   </div> `
  //       )
  //       .join('');
  //     div.insertAdjacentHTML('beforeend', markup);
  //     loadMoreBtn.enable();
  //   })
  //   .catch(onError);
}

function onError(err) {
  console.error(err);
  loadMoreBtn.hide();
}

function clear() {
  gallery.innerHTML = '';
}

// let page = 1;

// async function getPictures(query) {
//   const res = await axios.get(
//     `${URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
//   );
//   return res.data.hits;
// }

// async function onFormClick(event) {
//   event.preventDefault();
//   console.log(input.value);
//   const inputValue = input.value;

//   try {
//     const hits = await getPictures(inputValue);
//     console.log(hits);
//     if (hits.length === 0)
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     nextPage();
//     createMarkup(hits);
//   } catch (error) {
//     onError(error);
//   } finally {
//     form.reset();
//   }
// }

// async function onLoadMoreClick() {
//   try {
//     const hits = await getPictures(inputValue);
//     console.log(hits);
//     if (hits.length === 0)
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     createMarkup(hits);
//   } catch (error) {
//     onError(error);
//   }
// }
