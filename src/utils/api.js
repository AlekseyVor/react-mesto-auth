import { config } from './constants.js';

class Api {
  constructor(config, option) {
    this._config = config;
    this._option = option;
  }

  _search = (url, type, token) => {
    return fetch(`${this._option.baseUrl}${url}`, {
      method: `${type}`,
      headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  _searchCardId = (url, type, token, cardid) => {
    return fetch(`${this._option.baseUrl}${url}${cardid}`, {
      method: `${type}`,
      headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  _checkResponse = (res) => {
    if (res.ok) { return res.json() }
    return Promise.reject(`Ошибка ${res.status}`)
  }

  getUserInfo = (token) => {
    return this._search(this._config.urlMe, this._config.methodGET, token)
      .then(this._checkResponse)

  }

  getInitialCards = (token) => {
    return this._search(this._config.urlCards, this._config.methodGET, token)
      .then(this._checkResponse);
  }

  patchUserInfo = (userInfo, token) => {
    return fetch(`${this._option.baseUrl}${this._config.urlMe}`, {
      method: `${this._config.methodPATCH}`,
      headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${userInfo.name}`,
        about: `${userInfo.about}`
      })
    })
      .then(this._checkResponse);
  }

  postNewCard = (card, token) => {
    return fetch(`${this._option.baseUrl}${this._config.urlCards}`, {
      method: `${this._config.methodPOST}`,
      headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${card.name}`,
        link: `${card.link}`
      })
    })
      .then(this._checkResponse);
  }

  deleteCard = (cardid, token) => {
    return this._searchCardId(this._config.urlCards, this._config.methodDELETE, token, cardid)
      .then(this._checkResponse);
  }

  updateLike = (cardid, status, token) => {
    if (status) {
      return this._searchCardId(this._config.urlLikes, this._config.methodPUT, token, cardid)
        .then(this._checkResponse);
    } else {
      return this._searchCardId(this._config.urlLikes, this._config.methodDELETE, token, cardid)
        .then(this._checkResponse);
    }

  }

  patchUserAvatar = (avatar, token) => {
    return fetch(`${this._option.baseUrl}${this._config.urlAvatar}`, {
      method: `${this._config.methodPATCH}`,
      headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${avatar}`,
      })
    })
      .then(this._checkResponse);
  }
}

const api = new Api(config, {
  baseUrl: 'http://localhost:3000',
  method: '',
  headers: {
    authorization: config.token,
    'Content-Type': 'application/json'
  }
});

export default api;
