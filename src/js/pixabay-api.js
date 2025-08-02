import axios from 'axios';

const API_KEY = '51572255-4a923f4e22b79815f5c68f565';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: PER_PAGE,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Failed to fetch images from Pixabay API');
  }
}
