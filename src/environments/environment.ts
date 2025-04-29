export const environment = {
  production: true,
  KEY: import.meta.env.NG_APP_KEY,
  URL_BASE_API_YOUTUBE: 'https://youtube.googleapis.com/youtube/v3',
  MAX_RESULTS: 9,
  URL_BASE_API_FAVORITE_VIDEOS: import.meta.env.NG_APP_URL_BASE_API_FAVORITE_VIDEOS,
  URL_BASE_API_IDENTITY: import.meta.env.NG_APP_URL_BASE_API_IDENTITY,
};
