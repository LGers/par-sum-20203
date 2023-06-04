import { GET_PAYMENT_STRING_DICTIONARY } from './getPaymentString.dictionary';

const { PAYMENT_FROM, PAYMENT_TO, PAYMENT, PAYMENT_FROM_ZERO } = GET_PAYMENT_STRING_DICTIONARY;

export const getPaymentString = (vacancy) => {
  const {
    id,
    profession,
    payment_from,
    payment_to,
    type_of_work,
    town,
    currency,
  } = vacancy;

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