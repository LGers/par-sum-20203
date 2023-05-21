import React from 'react';
import s from './Wrapper.module.scss';

export const Wrapper = ({ children}) => {
    return (
        <div className={s.wrapper}>
          <div className={s.wrapperContent}>
            {children}
          </div>
        </div>
    );
};
