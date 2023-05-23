import React from 'react';
import { Button, NumberInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import s from './VacanciesFilter.module.scss';
import { ReactComponent as IconClose } from '../../../../common/assets/img/x.svg';
import { Card } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { VACANCIES_FILTER_DICTIONARY } from './VacanciesFilter.dictionary';

const { FILTERS, RESET_ALL, BUTTON, INDUSTRY, PAYMENT_FROM, PAYMENT_TO }
  = VACANCIES_FILTER_DICTIONARY;

export const VacanciesFilter = ({ industries, setFilter, onReset }) => {
  const handleSubmit = (values) => {
    setFilter((prev) => ({ ...prev, ...values }));
  };

  const form = useForm({
    initialValues: {
      [INDUSTRY.NAME]: null,
      [PAYMENT_FROM.NAME]: '',
      [PAYMENT_TO.NAME]: '',
    },
  });

  const handleResetFilters = () => {
    form.reset();
    onReset();
  };

  return (
    <Card withBorder radius="md" padding="lg">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <div className={s.vfTitle}>
          <label className={s.vfTitleLabel}>{FILTERS}</label>
          <Button unstyled className={s.vfTitleButton} onClick={handleResetFilters}>
            <div className={s.vfTitleReset}>
              <p>{RESET_ALL}</p>
              <IconClose />
            </div>
          </Button>
        </div>
        <div className={s.vfFilters}>
          <div>
            <Select
              labelProps={{ 'data-elem': 'industry-select' }}
              data-elem={'industry-select'}
              size="md"
              label={INDUSTRY.LABEL}
              placeholder={INDUSTRY.PLACEHOLDER}
              name={INDUSTRY.NAME}
              data={industries}
              rightSection={<IconChevronDown size="1rem" color={"#acabd9"} />}
              rightSectionWidth={30}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              radius="md"
              {...form.getInputProps(INDUSTRY.NAME)}
              clearable={true}
            />
          </div>
          <div className={s.vfFiltersPayment}>
            <NumberInput
              data-elem={'salary-from-input'}
              label={PAYMENT_FROM.LABEL}
              placeholder={PAYMENT_FROM.PLACEHOLDER}
              name={PAYMENT_FROM.NAME}
              size="md"
              radius="md"
              min={0}
              {...form.getInputProps(PAYMENT_FROM.NAME)}
            />
            <NumberInput
              data-elem={'salary-to-input'}
              type="number"
              placeholder={PAYMENT_TO.PLACEHOLDER}
              name={PAYMENT_TO.NAME}
              size="md"
              radius="md"
              min={0}
              {...form.getInputProps(PAYMENT_TO.NAME)}
            />
          </div>
          <Button
            data-elem={'search-button'}
            size="md"
            radius="md"
            styles={{ root: { backgroundColor: '#5e96fc' } }}
            type={"submit"}
          >
            {BUTTON}
          </Button>
        </div>
      </form>
    </Card>
  );
};
