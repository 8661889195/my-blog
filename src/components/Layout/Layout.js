import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import classes from './Layout.module.css';

export const Layout = () => {
  return(
    <>
    <Header />
    <div className={classes.mainContent}>
    <Outlet />
    </div>
  </>
  ) 
};