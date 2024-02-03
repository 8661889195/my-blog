import { useForm } from 'react-hook-form';
import { NewAccountForm } from '../NewAccountForm/NewAccountForm';
import { createUser } from '../services/mainSlice';
import classes from './NewAccount.module.css';

export const NewAccount = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });
  const onSubmit = (data) => {
    console.log(data);
  };

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
            validation={{ ...register('name', { required: true }) }}
            errors={errors?.name}
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
          <div>
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
          <button className={classes.buttonCreate} onClick={() => createUser()}>
            Create
          </button>
          <span className={classes.already}>
            Already have an account? <a className={classes.link}>Sign In.</a>
          </span>
        </div>
      </form>
    </div>
  );
};
