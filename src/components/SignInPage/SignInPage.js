import { useForm } from 'react-hook-form';
import { NewAccountForm } from '../NewAccountForm/NewAccountForm';
import classes from './SignInPage.module.css';

export const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.contentCreate}>
      <form className={classes.newAccount} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.header}>
          <span className={classes.headerContent}>Sign In</span>
        </div>
        <div className={classes.main}>
          <NewAccountForm
            name={'Email address'}
            type={'text'}
            placeholder={'Email address'}
            validation={{ ...register('email', { required: true, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ } }) }}
            errors={errors?.email}
            textError={'Not valid email'}
          />
          <div>
            <NewAccountForm
              name={'Password'}
              placeholder={'Password'}
              isEyeIcon
              validation={{ ...register('password', { required: true, minLength: 6 }) }}
              errors={errors?.password}
              textError={'Your password needs to be at least 6 characters'}
            />
          </div>
        </div>
        <div className={classes.login}>
          <button className={classes.buttonLogin}>Login</button>
          <span className={classes.already}>
          Don’t have an account?<a className={classes.link}>Sign Up.</a>
          </span>
        </div>
      </form>
    </div>
  );
};
