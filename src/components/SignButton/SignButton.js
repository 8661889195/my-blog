import { useNavigate } from 'react-router-dom';
import classes from './SignButton.module.css';

export const SignButton = ({ label, redirect }) => {

   let redirectPage = useNavigate();

  function handleRedirect() {
    redirectPage(redirect ? '/account' : '/signIn')
  }

  return(
    <button 
    type="button" 
    className={redirect ? classes.signUp : classes.signIn}
    onClick={() => handleRedirect()}
    >
    {label}
    </button>
  )
}