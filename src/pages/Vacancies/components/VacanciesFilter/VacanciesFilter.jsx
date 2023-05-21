import React from 'react';
import { Button, NumberInput, Select } from '@mantine/core';
import s from './VacanciesFilter.module.scss';
import { ReactComponent as IconClose } from '../../../../common/assets/img/x.svg';
import { Card } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { VACANCIES_FILTER_DICTIONARY } from './VacanciesFilter.dictionary';

const industryData =
  [
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'vue', label: 'Vue' },
  ];

const { FILTERS, RESET_ALL, BUTTON, INDUSTRY, PAYMENT_FROM, PAYMENT_TO }
  = VACANCIES_FILTER_DICTIONARY;

export const VacanciesFilter = () => {
  return (
    <Card withBorder radius="md" padding="lg">
      <div>
        <div className={s.vfTitle}>
          <label className={s.vfTitlelabel}>{FILTERS}</label>
          <div className={s.vfTitleReset}>
            <p>{RESET_ALL}</p>
            <IconClose />
          </div>
        </div>
        <div className={s.vfFilters}>
          <div>
            <Select
              size="md"
              label={INDUSTRY.LABEL}
              placeholder={INDUSTRY.PLACEHOLDER}
              data={industryData}
              rightSection={<IconChevronDown size="1rem" color={"#acabd9"} />}
              rightSectionWidth={30}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              radius="md"

            />
          </div>
          <div className={s.vfFiltersPayment}>
            <NumberInput
              label={PAYMENT_FROM.LABEL}
              placeholder={PAYMENT_TO.PLACEHOLDER}
              size="md"
              radius="md"
              min={0}
            />
            <NumberInput
              type="number"
              placeholder={PAYMENT_TO.PLACEHOLDER}
              size="md"
              radius="md"
              min={0}
            />
          </div>
          <Button
            size="md"
            radius="md"
            styles={{root: { backgroundColor: '#5e96fc' } }}
          >
            {BUTTON}
          </Button>
        </div>
      </div>
    </Card>
  );
};
