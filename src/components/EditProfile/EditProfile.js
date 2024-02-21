import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { NewAccountForm } from '../NewAccountForm/NewAccountForm';
import { updateUser } from '../services/mainSlice';
import classes from './EditProfile.module.css';

export const EditProfile = ({addNotification}) => {
  const dispatch = useDispatch();
  const { username, email, image } = useSelector((state) => state.main);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mod: 'onTouched' });

  let historyObj = useNavigate();
  const onSubmit = (data) => {
    dispatch(updateUser(data));
    addNotification(`User ${data.username} successfully updated`)
    historyObj('/articles');
  };

  return (
    <div className={classes.contentCreate}>
      <form className={classes.newAccount}>
        <div className={classes.header}>
          <span className={classes.headerContent}>Edit profile</span>
        </div>
        <div className={classes.main}>
          <NewAccountForm
            name="Username"
            value={username}
            type="text"
            placeholder="Username"
            validation={{ ...register('username', { required: true }) }}
            errors={errors?.username}
            textError="Required"
          />
          <NewAccountForm
            name="Email address"
            type="text"
            value={email}
            placeholder="Email address"
            validation={{ ...register('email', { required: true, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ } }) }}
            errors={errors?.email}
            textError="Not valid email"
          />
          <NewAccountForm
            name={'New password'}
            type={'text'}
            placeholder={'New password'}
            validation={{ ...register('password', { required: true }) }}
            errors={errors?.password}
            textError={'Your password needs to be at least 6 characters'}
          />
          <NewAccountForm name={'Avatar image(url)'} type={'text'} value={image} placeholder={'Avatar image'} />
        </div>
        <div className={classes.login}>
          <button className={classes.buttonLogin} onClick={handleSubmit(onSubmit)}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
