import { useEffect, useState } from 'react';

const FAVORITES = 'favoritesVacancies';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesVacancies = JSON.parse(localStorage.getItem(FAVORITES));

    Array.isArray(favoritesVacancies)
      ? setFavorites(favoritesVacancies)
      : localStorage.setItem(FAVORITES, JSON.stringify([]));
  }, []);

  const toggleFavorite = (vacancy) => {
    // e.preventDefault();

    const { id } = vacancy;

    if (favorites.filter((item) => item.id === id).length) {
      const newFavorites = favorites.filter((item) => item.id !== id);
      setFavorites(newFavorites);
      localStorage.setItem(FAVORITES, JSON.stringify([...newFavorites]));
    } else {
      setFavorites([vacancy, ...favorites]);
      localStorage.setItem(FAVORITES, JSON.stringify([vacancy, ...favorites]));
    }

    // onStarClick && onStarClick(e, vacancy);
  };

  return { favorites, setFavorites, toggleFavorite };
};
