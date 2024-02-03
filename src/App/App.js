import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { Articles } from '../components/Articles/Articles';
import { ArticleCard } from '../components/ArticleCard/ArticleCard';
import { NewAccount } from '../components/NewAccount/NewAccount';
import { SignInPage } from '../components/SignInPage/SignInPage';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleCard />} />
          <Route path="/account" element={<NewAccount />} />
          <Route path="/signIn" element={<SignInPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
