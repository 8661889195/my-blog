import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { NewAccountForm } from '../NewAccountForm/NewAccountForm';
import { createUser } from '../services/mainSlice';
import classes from './NewAccount.module.css';

export const NewAccount = ({addNotification}) => {

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  let historyObj = useNavigate();
  function handleClick(data) {
    console.log(data);
    localStorage.setItem('token', data.payload.user.token)
    addNotification(`User ${data.payload.user.username} successfully created`)
    historyObj('/articles')
    
  }

  const onSubmit = (data) => {
    dispatch(createUser(data))
    .then((response) => {
      handleClick(response)
    })
  }

  const password = watch('password');

  return (
    <div className={classes.contentCreate}>
      <form className={classes.newAccount} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.header}>
          <span className={classes.headerContent}>Create new account</span>
        </div>
        <div className={classes.main}>
          <NewAccountForm
            name={'Username'}
            type={'text'}
            placeholder={'Username'}
            validation={{ ...register('username', { required: true }) }}
            errors={errors?.username}
            textError={'Required'}
          />
          <NewAccountForm
            name={'Email address'}
            type={'text'}
            placeholder={'Email address'}
            validation={{ ...register('email', { required: true, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ } }) }}
            errors={errors?.email}
            textError={'Not valid email'}
          />
            <NewAccountForm
              name={'Password'}
              placeholder={'Password'}
              isEyeIcon
              validation={{ ...register('password', { required: true, minLength: 6 }) }}
              errors={errors?.password}
              textError={'Your password needs to be at least 6 characters'}
            />
            <NewAccountForm
              name={'Repeat Password'}
              placeholder={'Password'}
              isEyeIcon
              validation={{
                ...register('confirmPassword', {
                  required: true,
                  validate: (value) => value === password || 'The password do not match',
                }),
              }}
              errors={errors?.confirmPassword}
              textError={'The password do not match'}
            />
        </div>
        <div className={classes.sectionStrip}>
          <div className={classes.strip}></div>
          <div className={classes.personalInfo}>
            <input
              type="checkbox"
              {...register('personInfo', {
                required: {
                  value: true,
                  message: 'Required',
                },
              })}
              className={classes.inputInfoAbout}
            />
            <span className={classes.agree}>I agree to the processing of my personal information</span>
          </div>
          {errors.personInfo && <div style={{ color: 'red' }}>Required</div>}
        </div>
        <div className={classes.create}>
          <button className={classes.buttonCreate} onClick={handleSubmit(onSubmit)}>
            Create
          </button>
          <span className={classes.already}>
            Already have an account? <Link to="/signIn" className={classes.link}>Sign In.</Link>
          </span>
        </div>
      </form>
    </div>
  );
};
