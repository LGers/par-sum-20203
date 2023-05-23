import React from 'react';
import s from './EmptyState.module.scss';
import { ReactComponent as Empty } from '../../assets/img/balloon_empty_state.svg';
import { Text } from '@mantine/core';

const FOUND_NOTHING = 'Ничего не найдено...';

export const EmptyState = () => {
  return (
    <div className={s.emptyState}>
      <div>
        <Empty />
        <Text
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          ta="center"
          fz="xl"
          fw={700}
        >
          {FOUND_NOTHING}
        </Text>
      </div>
    </div>
  );
};
