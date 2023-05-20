import React from 'react';
import { Header } from '../../common/components/Header';
import { Wrapper } from '../../common/components/Wrapper';
import { ReactComponent as Empty } from '../../common/assets/img/empty.svg';
import { PAGE_404_DICTIONARY } from './Page404.dictionary';
import s from './Page404.module.scss';
import { Button, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { PATH } from '../../common/constants/routes.dictionary';

const { MESSAGE, BUTTON_TEXT } = PAGE_404_DICTIONARY;

export function Page404() {
  return (
    <Wrapper>
      <Header />
      <div className={s.content}>
        <Empty className={s.contentImg} />
        <Text className={s.contentText}>{MESSAGE}</Text>
        <Link to={PATH.SEARCH_VACANCIES}>
          <Button
            variant="light"
            size="md"
          >
            {BUTTON_TEXT}
          </Button>
        </Link>
      </div>
    </Wrapper>
  );
}
