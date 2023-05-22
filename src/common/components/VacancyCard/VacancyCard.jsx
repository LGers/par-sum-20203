import React from 'react';
import { Card } from '@mantine/core';
import s from './VacancyCard.module.scss';
import { ReactComponent as Location } from '../../assets/img/location.svg';
import { ReactComponent as Star } from '../../assets/img/star.svg';
import { VACANCY_CARD_DICTIONARY } from './VacancyCard.dictionary';

const { PAYMENT_FROM, PAYMENT_FROM_ZERO } = VACANCY_CARD_DICTIONARY;

export const VacancyCard = ({
                              id,
                              profession,
                              payment_from,
                              type_of_work,
                              town,
                              currency,
                              isFavorite,
                              onStarClick
                            }) => {
  const vacancy = {
    id,
    profession,
    payment_from,
    type_of_work,
    town,
    currency,
  };

  return (
    <Card withBorder radius="md" className={s.vc} padding="xl">
      <div className={s.vcHeader}>
        <h3 className={s.vcTitle}>{profession}</h3>
        <Star
          className={isFavorite ? s.vcStarActive : s.vcStar}
          onClick={(e) => onStarClick(e, vacancy)}
        />
      </div>
      <div className={s.vcPayment}>
        <p className={s.vcPaymentSalary}>
          {payment_from
            ? `${PAYMENT_FROM} ${payment_from} ${currency}`
            : PAYMENT_FROM_ZERO
          }
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
