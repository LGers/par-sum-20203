import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/2.0/`
  : 'localhost:4000';

export const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(async (axiosRequest) => {
  axiosRequest.headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    'x-secret-key': process.env.REACT_APP_X_SECRET_KEY || '',
    'X-Api-App-Id': process.env.REACT_APP_CLIENT_SECRET || '',
  };

  return axiosRequest;
});
