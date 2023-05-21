import { instance } from './instance';

export const URL = {
  catalogues: () => '/catalogues/',
};

export const getCatalogues = () => instance.get(URL.catalogues(), {
  params: {
    'x-secret-key': process.env.REACT_APP_X_SECRET_KEY || '',
  }
});
