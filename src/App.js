import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { PATH } from './common/constants/routes.dictionary';
import { Vacancies } from './pages/Vacancies';
import { MainPage } from './pages/MainPage';
import { FavoritesVacancies } from './pages/FavoritesVacancies';
import { Vacancy } from './pages/Vacancy';
import { Page404 } from './pages/Page404';

const { SEARCH_VACANCIES, FAVORITES, VACANCIES, VACANCY, PAGE_404 } = PATH;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<MainPage />} />
        <Route path={SEARCH_VACANCIES} element={<Vacancies />} />
        <Route path={VACANCIES} element={<Vacancies />} />
        <Route path={FAVORITES} element={<FavoritesVacancies />} />
        <Route path={`${VACANCY}/:id`} element={<Vacancy />} />
        <Route path={PAGE_404} element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
