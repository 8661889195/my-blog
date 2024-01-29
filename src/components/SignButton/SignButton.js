import classes from './SignButton.module.css';

export const SignButton = ({ variant, label }) => {
  return(
    <button type="button" className={variant === 'green' ? classes.green : classes.simple}>{label}</button>
  )
}