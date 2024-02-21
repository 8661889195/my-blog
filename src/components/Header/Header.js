import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SignButton } from '../SignButton/SignButton';
import { LogOut } from '../LogOut/LogOut';
import classes from './Header.module.css';

export const Header = () => {

  const { username } = useSelector((state) => state.main);

  const changeHeader = username ? (
    <div className={classes.sectionUser}>
      <LogOut />
    </div>
  ) : (
    <div>
      <SignButton classButton="signIn" label="Sign In" />
      <SignButton classButton="signUp" label="Sign Up" redirect />
    </div>
  );

  return (
    <div className={classes.header}>
      <Link to="/articles" className={classes.title}>Realword Blog</Link>
      {changeHeader}
    </div>
  );
};
