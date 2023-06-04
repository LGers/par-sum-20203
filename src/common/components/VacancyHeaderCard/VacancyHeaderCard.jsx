import React from 'react';
import { Card } from '@mantine/core';
import s from './VacancyHeaderCard.module.scss';
import { ReactComponent as Location } from '../../assets/img/location.svg';
import { ReactComponent as Star } from '../../assets/img/star.svg';
import { getPaymentString } from '../../utils';

export const VacancyHeaderCard = ({ vacancy, isFavorite, onStarClick }) => {
  const {
    id,
    profession,
    type_of_work,
    town,
  } = vacancy;

  const handleStarClick = () => {
    onStarClick && onStarClick(vacancy);
  };

  const payment = getPaymentString(vacancy);

  return (
    <Card
      data-elem={`vacancy-${id}`}
      withBorder radius="md"
      className={s.vc}
      padding="xl"
    >
      <div className={s.vcHeader}>
        <h3 className={s.vcTitle}>{profession}</h3>
        <Star
          data-elem={`vacancy-${id}-shortlist-button`}
          className={isFavorite ? s.vcStarActive : s.vcStar}
          onClick={handleStarClick}
        />
      </div>
      <div className={s.vcPayment}>
        <p className={s.vcPaymentSalary}>
          {payment}
        </p>
        <p className={s.vcDot}>•</p>
        <p>{type_of_work.title}</p>
      </div>
      <div className={s.vcLocation}>
        <Location />
        <p>{town.title}</p>
      </div>
    </Card>
  );
};
