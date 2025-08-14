import type {GIFResponse} from '../interfaces/gif.response.ts';

const apiKey = 'mkb6fE2Qx1z0XYDu3yienJt7xrBqXtDn';

fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`)
  .then(resp => resp.json())
  .then((body: GIFResponse) => {
    console.log(body.data.images.downsized_medium.url);
  })
  .catch(error => console.error('Error fetching data:', error));
