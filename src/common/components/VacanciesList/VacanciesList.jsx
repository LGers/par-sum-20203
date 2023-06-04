import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../constants/routes.dictionary';
import { VacancyCard } from '../VacancyCard';
import s from './VacanciesList.module.scss';
import { useFavorites } from '../../hooks/useFavorites';

export const VacanciesList = ({ vacancies, onStarClick }) => {
  const { favorites, toggleFavorite } = useFavorites();

  const handleStarClick = (e, vacancy) => {
    e.preventDefault();
    toggleFavorite(vacancy);
    onStarClick && onStarClick(vacancy);
  };

  const vacanciesList = vacancies.map((item) => {
    return (
      <Link
        to={`${PATH.VACANCY}/${item.id}`}
        key={item.id}
        className={s.vacanciesListCard}
      >
        <VacancyCard
          id={item.id}
          profession={item.profession}
          payment_from={item.payment_from}
          currency={item.currency}
          town={item.town}
          type_of_work={item.type_of_work}
          vacancy={item}
          isFavorite={favorites.filter((item2) => item2.id === item.id).length}
          onStarClick={(e) => handleStarClick(e, item)}
        />
      </Link>
    );
  });
  return (
    <>
      {vacanciesList}
    </>
  );
};
