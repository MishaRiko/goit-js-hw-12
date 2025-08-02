import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function initLightbox() {
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    overlayOpacity: 0.9,
  });
}

export function refreshLightbox() {
  lightbox.refresh();
}

export function createGallery(images) {
  const gallery = document.querySelector('.gallery'); // Селектор тут
  const markup = images
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
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery'); // Селектор тут
  gallery.innerHTML = '';
}

export function showLoader() {
  const loader = document.querySelector('.loader'); // Селектор тут
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  const loader = document.querySelector('.loader'); // Селектор тут
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  const button = document.querySelector('.load-more'); // Селектор тут
  button.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  const button = document.querySelector('.load-more'); // Селектор тут
  button.classList.add('is-hidden');
}

export function showEndMessage() {
  document.querySelector('.end-message').classList.remove('is-hidden');
}

export function hideEndMessage() {
  document.querySelector('.end-message').classList.add('is-hidden');
}
