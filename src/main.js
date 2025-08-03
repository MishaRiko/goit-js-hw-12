import { getImagesByQuery } from './js/pixabay-api';
import {
  initLightbox,
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndMessage,
  hideEndMessage,
  refreshLightbox,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

initLightbox();

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let loadedHits = 0;

// Оптимізовані допоміжні функції
const shouldShowLoadMore = () =>
  loadedHits >= 15 && currentPage * 15 < totalHits;
const isEndOfResults = () => currentPage * 15 >= totalHits;

const smoothScroll = () => {
  const galleryItem = document.querySelector('.gallery-item');
  if (!galleryItem) return;

  window.scrollBy({
    top: galleryItem.getBoundingClientRect().height * 2,
    behavior: 'smooth',
  });
};

const handleError = error => {
  console.error('Error:', error);
  iziToast.error({
    title: 'Error',
    message: 'Failed to load images. Please try again later.',
    position: 'topRight',
    timeout: 3000,
  });
};

// Обробка пошуку
form.addEventListener('submit', async e => {
  e.preventDefault();

  currentQuery = e.currentTarget.searchQuery.value.trim();
  if (!currentQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter search query',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;
  hideLoadMoreButton();
  hideEndMessage();
  clearGallery();
  showLoader();

  try {
    const { hits, totalHits: newTotalHits } = await getImagesByQuery(
      currentQuery,
      currentPage
    );
    totalHits = newTotalHits;
    loadedHits = hits.length;

    if (!hits.length) {
      iziToast.info({
        title: 'Info',
        message: 'No images found for your query',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);
    refreshLightbox();

    shouldShowLoadMore() ? showLoadMoreButton() : showEndMessage();
  } catch (error) {
    handleError(error);
  } finally {
    hideLoader();
  }
});

// Обробка Load More
loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  showLoader();
  hideLoadMoreButton();

  try {
    const { hits } = await getImagesByQuery(currentQuery, currentPage);
    loadedHits += hits.length;

    const gallery = document.querySelector('.gallery');
    gallery.insertAdjacentHTML(
      'beforeend',
      hits
        .map(
          image => `
      <li class="gallery-item">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
          <div class="info">
            <p><b>Likes:</b> ${image.likes}</p>
            <p><b>Views:</b> ${image.views}</p>
            <p><b>Comments:</b> ${image.comments}</p>
            <p><b>Downloads:</b> ${image.downloads}</p>
          </div>
        </a>
      </li>
    `
        )
        .join('')
    );

    refreshLightbox();
    smoothScroll();

    isEndOfResults() ? showEndMessage() : showLoadMoreButton();
  } catch (error) {
    handleError(error);
  } finally {
    hideLoader();
  }
});
