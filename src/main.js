import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndMessage,
  hideEndMessage,
  initLightbox,
  refreshLightbox,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Ініціалізація
const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

initLightbox();

// Обробка пошуку
form.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearch(e) {
  e.preventDefault();

  const query = e.target.elements.searchQuery.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  hideLoadMoreButton();
  hideEndMessage();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;
    clearGallery();

    if (!data.hits.length) {
      iziToast.error({
        title: 'Error',
        message: 'No images found. Please try another query!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    refreshLightbox();

    if (shouldShowLoadMore(data.hits.length)) {
      showLoadMoreButton();
    }

    iziToast.success({
      title: 'Success',
      message: `Found ${totalHits} images`,
      position: 'topRight',
    });
  } catch (error) {
    handleError(error);
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  currentPage++;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);
    refreshLightbox();

    smoothScroll();

    if (isEndOfResults()) {
      showEndMessage();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    handleError(error);
  } finally {
    hideLoader();
  }
}

// Допоміжні функції
function shouldShowLoadMore(loadedHits) {
  return loadedHits >= 15 && currentPage * 15 < totalHits;
}

function isEndOfResults() {
  return currentPage * 15 >= totalHits;
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function handleError(error) {
  console.error('Error:', error);
  iziToast.error({
    title: 'Error',
    message: 'Something went wrong. Please try again later.',
    position: 'topRight',
  });
}
