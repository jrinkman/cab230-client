// Axios HTTP library
import axios from 'axios';

class API {
  constructor(state, setAuth) {
    // Assign class properties
    this.state = state;
    this.setAuth = setAuth;

    // Create a new axios instance
    this.instance = axios.create({
      baseURL: 'http://131.181.190.87:3000',
    });

    // Create a store to save values
    this.store = {};
  }

  async __api(url, method, checkStore = true, data = {}) {
    // If the stored value exists and we want
    // to use the store, return it
    if (checkStore && this.store[url]) {
      return this.store[url];
    }

    // Make a HTTP request
    const resp = await this.instance.request({
      url,
      method,
      data,
      headers: {
        Authorization: `${this.state.token_type || ''} ${this.state.token || ''}`,
      },
    });

    // If checkStore is true, update the store
    if (checkStore) {
      this.store[url] = resp.data;
    }

    // Return the response data
    return resp.data;
  }

  async getStockSymbols(industry = null) {
    // Make the HTTP request via axios
    return this.__api(`/stocks/symbols${industry ? `?industry=${industry}` : ''}`, 'get');
  }

  async getStock(symbol) {
    // Make the HTTP request via axios
    return this.__api(`/stocks/${symbol}`, 'get');
  }

  async getStocksAuthed(symbol, from, to) {
    // Make the HTTP request via axios
    return this.__api(`/stocks/authed/${symbol}?from=${from}&to=${to}`, 'get');
  }

  async register(email, password) {
    // Make the HTTP request via axios
    return this.__api('/users/register', 'post', false, {
      email,
      password,
    });
  }

  async login(email, password) {
    // Make sure we're not already logged in
    if (this.state.logged_in) {
      return;
    }

    // Make the HTTP request via axios
    // eslint-disable-next-line camelcase
    const { token, token_type, expires } = await this.__api('/users/login', 'post', false, {
      email,
      password,
    });

    // Update auth information
    const newAuth = {
      logged_in: true,
      token,
      token_type,
      expires: Date.now() + expires * 1000,
    };

    // Update auth state & local storage
    this.setAuth(newAuth);
    localStorage.setItem('auth', newAuth);
  }

  logout() {
    // Create a new auth state
    const newAuth = {
      logged_in: false,
      token: null,
      token_type: null,
      expires: null,
    };

    // Update the auth state and local storage
    this.setAuth(newAuth);
    localStorage.setItem('auth', newAuth);
  }
}

export default API;
