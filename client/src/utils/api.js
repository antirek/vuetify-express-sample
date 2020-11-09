import axios from 'axios';
import store from './../store';
import resource from 'resource-axios';

const baseUrl = 'http://localhost:3000';

axios.interceptors.request.use(function (config) {
  const token = store.getters.token;
  config.headers['API-Token'] = token;
  return config;
});

const Item = resource(baseUrl + '/items', axios);

export {Item};

const apiCall = {
  get: async (url) => {
    const reqUrl = baseUrl + url;
    const token = store.getters.token;
    console.log('url', url, reqUrl);
    return await axios.get(reqUrl, {
      headers: {
        'API-Token': token,
      }
    });
  },
  post: async (url, data) => {
    const reqUrl = baseUrl + url;
    const token = store.getters.token;
    return await axios.post(reqUrl, data, {
      headers: {
        'API-Token': token,
      }
    });
  },
  delete: async (url) => {
    const reqUrl = baseUrl + url;
    const token = store.getters.token;
    console.log('url', url, reqUrl);
    return await axios.delete(reqUrl, {
      headers: {
        'API-Token': token,
      }
    });
  },
}

export default apiCall;
