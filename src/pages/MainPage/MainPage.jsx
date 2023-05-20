import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '@mantine/core';
import { PATH } from '../../common/constants/routes.dictionary';

const { VACANCIES, SEARCH_VACANCIES, FAVORITES } = PATH;

export const MainPage = () => {
  return (
    <div>
      <p>MainPage</p>
      <Text>MainPage</Text>
      <div>
        <Link to={'/'}>Main Page</Link>
      </div>
      <div>
        <Link to={VACANCIES}>Vacancies</Link>
      </div>
      <div>
        <Link to={SEARCH_VACANCIES}>Search vacancies</Link>
      </div>
      <div>
        <Link to={FAVORITES}>Favorites vacancies</Link>
      </div>
    </div>
  );
};