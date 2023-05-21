import { instance } from './instance';

export const URL = {
  password: () => '/oauth2/password/',
};

export const getToken = () => instance.get(URL.password(), {
  params: {
    login: process.env.REACT_APP_LOGIN || '',
    password: process.env.REACT_APP_PASSWORD || '',
    client_id: process.env.REACT_APP_CLIENT_ID || '',
    client_secret: process.env.REACT_APP_CLIENT_SECRET || '',
    hr: process.env.REACT_APP_HR || '',
  }
});
