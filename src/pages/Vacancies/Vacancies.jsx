import React, { useEffect, useState } from 'react';
import {
  Dialog,
  Group,
  TextInput,
  Button,
  Pagination,
  Text
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Header } from '../../common/components/Header';
import { Wrapper } from '../../common/components/Wrapper';
import { VACANCIES_DICTIONARY } from './Vacancies.dictionary';
import s from './Vacancies.module.scss';
import { VacanciesFilter } from './components/VacanciesFilter';
import { getToken } from '../../common/api/auth';
import { getVacancies } from '../../common/api/vacancies';
import { getCatalogues } from '../../common/api/catalogues';
import { VacanciesList } from '../../common/components/VacanciesList';

const { SEARCH, ERROR, OK } = VACANCIES_DICTIONARY;
const ITEMS_PER_PAGE = 20;

const getPagesCount = (total, itemPerPage) => {
  const pages = Math.ceil(total / itemPerPage);

  if (!pages) {
    return 1;
  }

  return pages > 26 ? 26 : pages;
};

export const Vacancies = () => {
  const [apiError, setApiError] = useState('');
  const [vacancies, setVacancies] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [catalogues, setCatalogues] = useState([]);
  const [filter, setFilter] = useState({
    keyword: '',
    catalogues: null,
    paymentFrom: 0,
    paymentTo: 0,
  });

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await getToken();
        const { data } = res;
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
      } catch (e) {

        setApiError(e.message);
      }
    }

    async function fetchVacancies() {
      try {
        const res = await getVacancies({ page: page - 1, ...filter });
        setVacancies(res.data.objects);
        setTotal(res.data.total);
      } catch (e) {
        setApiError(e.response.data.error.message);
      }
    }

    async function fetchCatalogues() {
      try {
        const res = await getCatalogues();
        const { data } = res;
        const industries = data.map((item) => {
          return { value: item.key, label: item.title };
        });
        setCatalogues(industries);
      } catch (e) {
        setApiError(e.response.data.error.message);
      }
    }

    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      fetchToken();
    }

    fetchVacancies();
    fetchCatalogues();
  }, [page, filter]);

  return (
    <Wrapper>
      <Header />
      <div className={s.vacanciesWrapper}>
        <div className={s.vacancies}>
          <aside>
            <VacanciesFilter industries={catalogues} setFilter={setFilter} />
          </aside>
          <div className={s.vacanciesContent}>
            <TextInput
              icon={<IconSearch size="1.1rem" stroke={1.5} />}
              size="lg"
              radius="md"
              rightSection={
                <Button
                  onClick={() => console.log('Find click')}
                  styles={{ root: { backgroundColor: '#5e96fc' } }}
                  radius="md"
                >
                  {SEARCH.BUTTON}
                </Button>
              }
              placeholder={SEARCH.PLACEHOLDER}
              rightSectionWidth={104}
            />
            <div className={s.vacanciesList}>
              <VacanciesList vacancies={vacancies} />
            </div>
            <div className={s.vacanciesPagination}>
              <Pagination
                total={getPagesCount(total, ITEMS_PER_PAGE)}
                value={page}
                onChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog opened={apiError} withCloseButton onClose={() => setApiError('')} size="lg"
              radius="md">
        <Text size="sm" mb="xs" weight={500} color={'red'}>
          {ERROR}
        </Text>
        <Text size="sm" mb="xs" weight={500} color={'red'}>
          {apiError}
        </Text>
        <Group align="center" position="center">
          <Button color="red" onClick={() => setApiError('')}>{OK}</Button>
        </Group>
      </Dialog>
    </Wrapper>
  );
};
