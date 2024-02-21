import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Popover, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { deleteArticle } from '../services/mainSlice';
import classes from './Popup.module.css';


export const Popup = ({username, author, addNotification}) => {

  const dispatch = useDispatch();

  let historyObj = useNavigate();
  const handleArticle = () => {
    if(username === author) {
      dispatch(deleteArticle(currentSlug[4]))
      addNotification('Article successfully deleted')
      historyObj('/articles')
    } else return;
  }

  const currentSlug = window.location.href.split('/');

  const content = (
    <div className={classes.popup}>
      <button className={classes.no}>No</button>
      <button className={classes.yes} 
      onClick={() => handleArticle()}>Yes</button>
    </div>
  );

  return(
    <Space wrap>
    <Popover 
    className={classes.popover}
    content={content} 
    title="Are you sure to delete this article?" 
    trigger="click">
      <Button className={classes.delete}>Delete</Button>
    </Popover>
  </Space>
  )
};
