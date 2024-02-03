import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { useState } from 'react';
import classes from './NewAccountForm.module.css';

export const NewAccountForm = ({name, placeholder, validation, errors, textError, isEyeIcon }) => {
  
  // const [passwordEye, setPasswordEye ] = useState(false);
  const [isIcon, setPasswordEye ] = useState(isEyeIcon);
  
    const handlePasswordClick = () => {
      setPasswordEye(!isIcon)
    }

  return (
        <div className={classes.twoValue}>
          <div className={classes.nameField}>
          <span className={classes.name}>{name}</span>
          </div>
          <div className={classes.inputSection}>
          <input
          {...validation}
            type={ (isIcon) ? 'password' : 'text'}
            placeholder={placeholder}
            className={`${classes.input} ${errors && classes.class}`}
          />
          {isEyeIcon && <div className={classes.eyes}>
            {
              (isIcon) ? <FaEyeSlash onClick={handlePasswordClick} /> : <FaEye onClick={handlePasswordClick} />
            }
            </div>}
            </div>
          {errors && <span style={{ color: 'red'}}>{textError}</span>}
        </div>
  );
};
