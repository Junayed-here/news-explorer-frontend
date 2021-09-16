export default class MainApi {
    constructor(options) {
        this._baseURL = options.baseUrl;
        this._headers = options.headers;
    }
    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    }
    getSavedNews() {
        return fetch(this._baseURL+"/api/articles", {
            headers: this._headers
        }).then(res=> this._checkResponse(res));
    }
    saveNews(data) {
        return fetch(this._baseURL+"/api/articles", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(res=> this._checkResponse(res));
    }
    deleteSavedNews(id) {
        return fetch(this._baseURL+"/api/articles/"+id, {
            method: "DELETE",
            headers: this._headers
        }).then(res=> this._checkResponse(res));
    }
}