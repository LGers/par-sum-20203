import React from 'react';
import { Card } from '@mantine/core';
import s from './VacancyCard.module.scss';
import { ReactComponent as Location } from '../../assets/img/location.svg';
import { ReactComponent as Star } from '../../assets/img/star.svg';
import { VACANCY_CARD_DICTIONARY } from './VacancyCard.dictionary';

const { PAYMENT_FROM, PAYMENT_TO, PAYMENT, PAYMENT_FROM_ZERO } = VACANCY_CARD_DICTIONARY;

export const VacancyCard = ({ vacancy, isFavorite, onStarClick }) => {
  const {
    id,
    profession,
    payment_from,
    payment_to,
    type_of_work,
    town,
    currency,
  } = vacancy;

  const getPaymentString = () => {
    if (!payment_from && !payment_to) {
      return PAYMENT_FROM_ZERO;
    }

    if (payment_from && !payment_to) {
      return `${PAYMENT_FROM} ${payment_from} ${currency}`;
    }

    if (!payment_from && payment_to) {
      return `${PAYMENT_TO} ${payment_to} ${currency}`;
    }

    return `${PAYMENT} ${payment_from} - ${payment_to} ${currency}`
  }
  const handleStarClick = (e, vacancy) => {
    onStarClick && onStarClick(e, vacancy);
  };

  const payment = getPaymentString();

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
