import React from 'react';
import { Header } from '../../common/components/Header';
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { PATH } from '../../common/constants/routes.dictionary';
import { Wrapper } from '../../common/components/Wrapper';
import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { VACANCIES_DICTIONARY } from './Vacancies.dictionary';
import { IconSearch } from '@tabler/icons-react';
import { VacancyCard } from '../../common/components/VacancyCard';
import s from './Vacancies.module.scss';

const mock_cards = [
  {
    id: 1,
    payment_from: 0,
    payment_to: 0,
    profession: 'Profession name 1',
    currency: 'rub',
    type_of_work: {
      id: 6,
      title: "Полный рабочий день",
    },
    town: {
      id: 14,
      title: "Санкт-Петербург",
      declension: "в Санкт-Петербурге",
      genitive: "Санкт-Петербурга"
    },
  }, {
    id: 2,
    payment_from: 100000,
    payment_to: 200000,
    profession: 'Profession name 1',
    currency: 'rub',
    type_of_work: {
      id: 6,
      title: "Полный рабочий день",
    },
    town: {
      id: 14,
      title: "Санкт-Петербург",
      declension: "в Санкт-Петербурге",
      genitive: "Санкт-Петербурга"
    },
  },
];

const { SEARCH } = VACANCIES_DICTIONARY;

const vacancies = mock_cards.map((item) => {
  return (
    <Link to={`${PATH.VACANCIES}/${item.id}`} key={item.id}>
      <VacancyCard
        profession={item.profession}
        payment_from={item.payment_from}
        currency={item.currency}
        town={item.town}
        type_of_work={item.type_of_work}
      />
    </Link>
  );
});

export const Vacancies = () => {
  return (
    <Wrapper>
      <Header />
      <div className={s.vacancies}>
        <aside>
          Filters
        </aside>
        <div className={s.vacanciesContent}>
          <TextInput
            icon={<IconSearch size="1.1rem" stroke={1.5} />}
            size="lg"
            rightSection={
              <Button
                onClick={() => console.log('Find click')}
              >
                {SEARCH.BUTTON}
              </Button>
            }
            placeholder={SEARCH.PLACEHOLDER}
            rightSectionWidth={104}
          />
          <div className={s.vacanciesList}>
            {vacancies}
          </div>
          <div>
            Paginator
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
