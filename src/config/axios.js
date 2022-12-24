import axios from "axios";

export const _AxiosService = axios.create({
  baseURL: 'https://api.github.com/'
})