import React, { useEffect, useState } from 'react';
import { Header } from '../../common/components/Header';
import { Wrapper } from '../../common/components/Wrapper';
import s from './FavoritesVacancies.module.scss';
import { Pagination } from '@mantine/core';
import { VacanciesList } from '../../common/components/VacanciesList';

export const FavoritesVacancies = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesVacancies = JSON.parse(localStorage.getItem('favoritesVacancies'));

    Array.isArray(favoritesVacancies)
      ? setFavorites(favoritesVacancies)
      : localStorage.setItem('favoritesVacancies', JSON.stringify([]));
  }, []);

  const handleStarClick = () => {
    const favoritesVacancies = JSON.parse(localStorage.getItem('favoritesVacancies'));

    if (Array.isArray(favoritesVacancies)) {
      setFavorites(favoritesVacancies);
    } else {
      setFavorites([]);
      localStorage.setItem('favoritesVacancies', JSON.stringify([]));
    }
  };

  return (
    <Wrapper>
      <Header />
      <div className={s.fvContent}>
        <div className={s.fvList}>
          <VacanciesList
            vacancies={favorites}
            onStarClick={handleStarClick}
          />
        </div>
        <div className={s.fvPagination}>
          <Pagination
            total={1}
          />
        </div>
      </div>
    </Wrapper>
  );
};
