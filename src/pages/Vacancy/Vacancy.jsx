import React, { useEffect, useState } from 'react';
import { Header } from '../../common/components/Header';
import { Button, Card, Dialog, Group, Text } from '@mantine/core';
import { Wrapper } from '../../common/components/Wrapper';
import s from './Vacancy.module.scss';
import { VacancyCard } from '../../common/components/VacancyCard';
import { useParams } from 'react-router-dom';
import { VACANCY_DICTIONARY } from './Vacancy.dictionary';
import { getToken } from '../../common/api/auth';
import { getVacancy } from '../../common/api/vacancies';
import parse from 'html-react-parser';

const { ERROR, OK } = VACANCY_DICTIONARY;

export const Vacancy = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [apiError, setApiError] = useState('');
  const [vacancy, setVacancy] = useState({
    id: null,
    profession: null,
    payment_from: 0,
    type_of_work: 0,
    town: '',
    currency: '',
    vacancyRichText: '',
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

    async function fetchVacancy() {
      try {
        const res = await getVacancy({ id });
        setVacancy(res.data);
      } catch (e) {

        setApiError(e.response.data.error.message);
      }
    }

    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      fetchToken();
    }

    fetchVacancy();
  }, [id]);

  const handleStarClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Wrapper>
      <Header />
      {vacancy.id &&
      <div className={s.vacancyContent}>
        <VacancyCard
          vacancy={vacancy}
          isFavorite={isFavorite}
          onStarClick={handleStarClick}
        />
        <Card withBorder radius="md" className={s.vacancyDescription} padding="xl">
          {parse(vacancy.vacancyRichText)}
        </Card>
      </div>
      }
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