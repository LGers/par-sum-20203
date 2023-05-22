import { instance } from './instance';

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
                             }) => instance.get(URL.vacancies(), {
  params: {
    'x-secret-key': process.env.REACT_APP_X_SECRET_KEY || '',
    page: page >= 0 ? page : 0,
    keyword,
    payment_from,
    payment_to,
    catalogues,
    published: 1,
  }
});

export const getVacancy = ({ id }) => instance.get(URL.vacancy(id), {
  params: {
    'x-secret-key': process.env.REACT_APP_X_SECRET_KEY || '',
  }
});
