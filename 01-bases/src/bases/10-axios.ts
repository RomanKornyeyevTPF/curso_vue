import axios from 'axios';
import type { GIFResponse } from '../interfaces/gif.response';

const apiKey = import.meta.env.VITE_API_KEY_GIPHY;

export const giphyApi = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    api_key: apiKey,
  },
});

// giphyApi.get<GIFResponse>('/random')
//   .then( resp => console.log( resp.data.data.images.downsized_large.url ))
//   .catch( err => console.log( err ))