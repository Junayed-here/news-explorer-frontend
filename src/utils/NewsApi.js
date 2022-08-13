import config from '../utils/config.json';
const BASE_URL = "https://newsapi.org/v2/everything";

// const today = moment().format("YYYY-MM-DD");
// const weekAgo = moment().subtract(7, 'days').format("YYYY-MM-DD");
function weekAgo() {
    return Date.now() - 7 * 24 * 60 * 60;
  }
function today() {
    return Date.now();
  }

export const searchNews  = (keyword) => {
    return fetch(`${BASE_URL}?q=${keyword}&from${weekAgo}&to=${today}&sortBypopularity&apiKey=${config.API_KEY}`, {
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