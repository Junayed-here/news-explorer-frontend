import { NEWS_URL, API_KEY } from '../utils/config.json';
import moment from 'moment';
const BASE_URL = "https://newsapi.org/v2/everything";

const today = moment().format("YYYY-MM-DD");
const weekAgo = moment().subtract(7, 'days').format("YYYY-MM-DD");

export const searchNews  = (keyword) => {
    return fetch(`${BASE_URL}?q=${keyword}&from=${weekAgo}&to=${today}&apiKey=${API_KEY}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((res) => {
            return res;
        })
};