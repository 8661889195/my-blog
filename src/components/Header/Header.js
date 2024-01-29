import { SignButton } from '../SignButton/SignButton';
import classes from './Header.module.css';

export const Header = () => {
  return(
    <div className={classes.header}>
      <p className={classes.title}>Realworld Blog</p>
      <div>
      <SignButton label='Sign In'/>
      <SignButton label='Sign Up' variant='green'/>
      </div>
    </div>
  )
}