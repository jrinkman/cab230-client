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
  }

  async __api(url, method, data = {}) {
    // Make a HTTP request
    const resp = await this.instance.request({
      url,
      method,
      data,
      headers: {
        Authorization: `${this.state.token_type || ''} ${this.state.token || ''}`,
      },
      timeout: 3000,
    });

    // Return the response data
    return resp.data;
  }

  async getStockSymbols(industry = null) {
    // Make the HTTP request via axios
    return this.__api(`/stocks/symbols${industry ? `?industry=${industry}` : ''}`, 'get');
  }

  async getStockLatest(symbol) {
    // Make the HTTP request via axios
    return this.__api(`/stocks/${symbol}`, 'get');
  }

  async getStockAuthed(symbol, from, to) {
    // Make the HTTP request via axios
    return this.__api(`/stocks/authed/${symbol}?from=${from}&to=${to}`, 'get');
  }

  async register(data) {
    // Make the HTTP request via axios
    return this.__api('/user/register', 'post', {
      email: data.email,
      password: data.password,
    });
  }

  async login(data) {
    // Make sure we're not already logged in
    if (this.state.logged_in) {
      return;
    }

    // Make the HTTP request via axios
    // eslint-disable-next-line camelcase
    const { token, token_type, expires_in } = await this.__api('/user/login', 'post', {
      email: data.email,
      password: data.password,
    });

    // Update auth information
    const newAuth = {
      logged_in: true,
      token,
      token_type,
      // eslint-disable-next-line camelcase
      expires: Date.now() + expires_in * 1000,
    };

    // Update auth state & local storage
    this.setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
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
    localStorage.setItem('auth', JSON.stringify(newAuth));
  }
}

export default API;
