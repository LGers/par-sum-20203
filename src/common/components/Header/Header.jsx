import React from 'react';
import s from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/img/logo-big.svg';
import { PATH } from '../../constants/routes.dictionary';

const { FAVORITES, MAIN_ROUTE } = PATH;

const NAV_LINKS = [
  { id: 1, label: 'Поиск Вакансий', link: MAIN_ROUTE },
  { id: 2, label: 'Избранное', link: FAVORITES },
];

const navLinks = NAV_LINKS.map((item) => (
  <li key={item.id}>
    <NavLink to={item.link} className={s.navLink}>
      {item.label}
    </NavLink>
  </li>
));

export const Header = () => {
  return (
    <div className={s.headerWrapper}>
      <div className={s.header}>
        <div className={s.headerLogo}>
          <Logo />
        </div>
        <div className={s.headerLinks}>
          <ul>
            {navLinks}
          </ul>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};
