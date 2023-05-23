import React from 'react';
import { Loader } from '@mantine/core';
import s from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={s.loading}>
      <Loader />
    </div>
  );
};
