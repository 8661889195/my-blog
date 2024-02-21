import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutUser } from '../services/mainSlice';
import haveNoAvatar from '../../images/2bf7cbea0e8e0ac709ec6af74b5bc3fa.png';

import classes from './LogOut.module.css';

export const LogOut = () => {

  const dispatch = useDispatch();

  const { username, image } = useSelector((state) => state.main);

  const userAvatar = image ? image : <img src={haveNoAvatar} alt="avatar" />;

  let historyObj = useNavigate();
  function handleClick() {
    localStorage.removeItem('token')
    dispatch(logoutUser())
    historyObj('/articles')
  }

  return(
    <div className={classes.userAbility}>
      <Link to="/newArticle" className={classes.create}>Create article</Link>
      <Link to="/editProfile" className={classes.link}>
      <div className={classes.infoAbout}>
      <div className={classes.username}>{username}</div>
      <div>{userAvatar}</div>
      </div>
      </Link>
      <button 
      type="button" 
      className={classes.logOut}
      onClick={() => handleClick()}
      >
      Log Out
      </button>
    </div>
  )
}