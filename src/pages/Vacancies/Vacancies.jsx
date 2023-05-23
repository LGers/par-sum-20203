import React, { useEffect, useState } from 'react';
import {
  Dialog,
  Group,
  TextInput,
  Button,
  Pagination,
  Text,
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
import { Loading } from '../../common/components/Loading';
import { EmptyState } from '../../common/components/EmptyState';

const { SEARCH, ERROR, OK } = VACANCIES_DICTIONARY;
export const ITEMS_PER_PAGE = 4;

const getPagesCount = (total, itemPerPage) => {
  const pages = Math.ceil(total / itemPerPage);

  if (!pages) {
    return 1;
  }

  return pages > 125 ? 125 : pages;
};

export const Vacancies = () => {
  const initialFilterValues = {
    catalogues: null,
    paymentFrom: 0,
    paymentTo: 0,
  };

  const [apiError, setApiError] = useState('');
  const [vacancies, setVacancies] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [catalogues, setCatalogues] = useState([]);
  const [filter, setFilter] = useState({
    keyword: '',
    ...initialFilterValues,
  });
  const [searchString, setSearchString] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await getToken();
        const { data } = res;
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        return res;
      } catch (e) {
        setApiError(e.message);
      }
    }

    async function fetchVacancies() {
      try {
        setIsLoading(true);
        const res = await getVacancies({ page: page - 1, ...filter });
        setVacancies(res.data.objects);
        setTotal(res.data.total);
        setIsLoading(false);
      } catch (e) {
        console.log('error', e);
        setIsLoading(false);
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
      fetchToken().then(() => {
        fetchVacancies();
        fetchCatalogues();
      });

      return;
    }

    fetchVacancies();
    fetchCatalogues();
  }, [page, filter]);

  const handleResetFilter = () => {
    setFilter((prev) => ({ ...prev, ...initialFilterValues }));
  };

  const handleSearchChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleFindClick = () => {
    setPage(1);
    setFilter((prev) => ({ ...prev, keyword: searchString }));
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleFindClick();
    } else if (e.key === 'Escape') {
      setSearchString( '');
      setFilter((prev) => ({ ...prev, keyword: '' }));
    }
  };

  return (
    <Wrapper>
      <Header />
      <div className={s.vacanciesWrapper}>
        <div className={s.vacancies}>
          <aside>
            <VacanciesFilter
              industries={catalogues}
              setFilter={setFilter}
              onReset={handleResetFilter}
              setPage={() => setPage(1)}
            />
          </aside>
          <div className={s.vacanciesContent}>
            <TextInput
              value={searchString}
              onChange={handleSearchChange}
              onKeyUp={handleKeyUp}
              data-elem={'search-input'}
              icon={<IconSearch size="1.1rem" stroke={1.5} />}
              size="lg"
              radius="md"
              rightSection={
                <Button
                  data-elem="search-button"
                  onClick={handleFindClick} // todo
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
              {isLoading && <Loading />}
              {!vacancies.length && <EmptyState />}
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
