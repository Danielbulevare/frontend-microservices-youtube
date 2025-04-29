export const environment = {
  production: false,
  KEY: import.meta.env.NG_APP_KEY,
  URL_BASE_API_YOUTUBE: 'https://youtube.googleapis.com/youtube/v3',
  MAX_RESULTS: 9,
  URL_BASE_API_FAVORITE_VIDEOS: 'http://localhost:8080/api/favorite-video',
  URL_BASE_API_IDENTITY: 'http://localhost:8080/api/auth',
};
