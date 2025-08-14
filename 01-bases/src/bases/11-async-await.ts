import type { GIFResponse } from "../interfaces/gif.response";
import { giphyApi } from "./10-axios";

export const getImage = async() => {
  try {
    const resp = await giphyApi.get<GIFResponse>('/random');
    return resp.data.data.images.downsized_large.url;
  }catch (err) {
    throw new Error('No se pudo obtener la imagen');
  }
}

getImage()
  .then( url => { console.log( url )})
  .catch( err => { console.error( err )});