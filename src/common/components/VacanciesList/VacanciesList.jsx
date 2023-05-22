import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../constants/routes.dictionary';
import { VacancyCard } from '../VacancyCard';

export const VacanciesList = ({ vacancies, onStarClick }) => {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesVacancies = JSON.parse(localStorage.getItem('favoritesVacancies'));

    Array.isArray(favoritesVacancies)
      ? setFavorites(favoritesVacancies)
      : localStorage.setItem('favoritesVacancies', JSON.stringify([]));
  }, []);

  const handleStarClick = (e, vacancy) => {
    e.preventDefault();

    const { id } = vacancy;

    if (favorites.filter((item) => item.id === id).length) {
      const newFavorites = favorites.filter((item) => item.id !== id);
      setFavorites(newFavorites);
      localStorage.setItem('favoritesVacancies', JSON.stringify([...newFavorites]));
    } else {
      setFavorites([vacancy, ...favorites]);
      localStorage.setItem('favoritesVacancies', JSON.stringify([vacancy, ...favorites]));
    }

    onStarClick && onStarClick(e, vacancy);
  };

  const vacanciesList = vacancies.map((item) => {
    return (
      <Link to={`${PATH.VACANCIES}/${item.id}`} key={item.id}>
        <VacancyCard
          id={item.id}
          profession={item.profession}
          payment_from={item.payment_from}
          currency={item.currency}
          town={item.town}
          type_of_work={item.type_of_work}
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