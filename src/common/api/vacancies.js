import { instance } from './instance';
import { ITEMS_PER_PAGE } from '../../pages/Vacancies/Vacancies';

export const URL = {
  vacancies: () => '/vacancies/',
  vacancy: (id) => `/vacancies/${id}/`,
};

export const getVacancies = ({
                               page,
                               keyword,
                               payment_from,
                               payment_to,
                               catalogues
                             }) => {
  let params = {
    'x-secret-key': process.env.REACT_APP_X_SECRET_KEY || '',
    page: page >= 0 ? page : 0,
    keyword,
    catalogues,
    published: 1,
    count: ITEMS_PER_PAGE,
  };

  if (payment_from) {
    params = { ...params, payment_from, no_agreement: 1 };
  }

  if (payment_to) {
    params = { ...params, payment_to };
  }

  return instance.get(URL.vacancies(), { params });
};

export const getVacancy = ({ id }) => instance.get(URL.vacancy(id), {
  params: {
    'x-secret-key': process.env.REACT_APP_X_SECRET_KEY || '',
  }
});
