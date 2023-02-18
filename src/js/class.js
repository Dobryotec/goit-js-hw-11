import axios from 'axios';
const ENDPOINT = 'https://pixabay.com/api/';
const KEY = '33694347-6ae8de5621b95f7febdf77706';

export default class PicturesApiService {
  constructor() {
    this.page = 1;
    this.query = '';
  }

  async getPictures() {
    const URL = `${ENDPOINT}?key=${KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=100&page=${this.page}`;
    // return fetch(URL)
    //   .then(res => res.json())
    //   .then(({ hits }) => {
    //     this.nextPage();
    //     return hits;s
    //   })
    const res = await axios.get(URL);
    // this.nextPage();
    return res.data;

    // console.log(res.data.hits);

    // return axios.get(URL).then(({ data }) => {
    //   console.log(data);
    //   this.nextPage();
    //   return data.hits;
    // });
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
