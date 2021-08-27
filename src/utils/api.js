import {config} from './constants.js';

class Api {
    constructor(config, option) {
        this._config = config;
        this._option = option; 
    }

    _search = (url, type, token) => {
      return fetch(`${this._option.baseUrl}${url}`,{
        method: `${type}`,
        headers: {
          authorization: `${token}`,
          'Content-Type': 'application/json'
        }})
    }

    _searchCardId = (url, type, token, cardid) => {
      return fetch(`${this._option.baseUrl}${url}${cardid}`,{
        method: `${type}`,
        headers: {
          authorization: `${token}`,
          'Content-Type': 'application/json'
        }})
    }

    _checkResponse = (res) => {
      if(res.ok) {return res.json()}
      return Promise.reject(`Ошибка ${res.status}`)
    }

    getUserInfo = () => {
      return this._search(this._config.urlMe, this._config.methodGET, this._config.token)
      .then(this._checkResponse)
      
  }

    getInitialCards = () => {
      return this._search(this._config.urlCards, this._config.methodGET, this._config.token)
      .then(this._checkResponse);
  }

    patchUserInfo = (userInfo) => {
    return fetch(`${this._option.baseUrl}${this._config.urlMe}`,{
      method: `${this._config.methodPATCH}`,
      headers: {
        authorization: `${this._config.token}`,
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify({
        name: `${userInfo.name}`,
        about: `${userInfo.about}`
      })
    })
    .then(this._checkResponse);
}

  postNewCard = (card) => {
    return fetch(`${this._option.baseUrl}${this._config.urlCards}`,{
      method: `${this._config.methodPOST}`,
      headers: {
        authorization: `${this._config.token}`,
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify({
        name: `${card.name}`,
        link: `${card.link}`
      })
    })
    .then(this._checkResponse);
}

  deleteCard = (cardid) => {
    return this._searchCardId(this._config.urlCards, this._config.methodDELETE, this._config.token, cardid)
    .then(this._checkResponse);
  }

  updateLike = (cardid, status) => {
    if (status) {
      return this._searchCardId(this._config.urlLikes, this._config.methodPUT, this._config.token, cardid)
      .then(this._checkResponse);
    } else { 
      return this._searchCardId(this._config.urlLikes, this._config.methodDELETE, this._config.token, cardid)
      .then(this._checkResponse);
    }
    
  }

  patchUserAvatar = (avatar) => {
    return fetch(`${this._option.baseUrl}${this._config.urlAvatar}`,{
      method: `${this._config.methodPATCH}`,
      headers: {
        authorization: `${this._config.token}`,
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify({
        avatar: `${avatar}`,
      })
    })
    .then(this._checkResponse);
  }
}

const api = new Api(config, {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  method: '',
  headers: {
  authorization: config.token,
  'Content-Type': 'application/json'
  }
});

export default api;
