import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createArticle, updateArticle, getArticle } from '../services/mainSlice';
import classes from './NewArticle.module.css';

export const NewArticle = ({addNotification}) => {
  const dispatch = useDispatch();
  const isNew = window.location.href.includes('newArticle');
  const currentSlug = window.location.href.split('/')[4];
  const { article } = useSelector((state) => state.main)
  const [name, setTag] = useState('');
  let nextId = Math.floor(Math.random() * 100) + 1;
  const isArrayTags = article.tagList?.map((tag) => ({ id: nextId++, name: tag}));
  const [tagsList, setTagsList] = useState(isNew ? [] : isArrayTags);

  useEffect(() => {
    if(!isNew) {
      dispatch(getArticle(currentSlug))
    }
  }, [])

  useEffect(() => {
    if(!tagsList){
      setTagsList(isArrayTags)   
    }
  }, [isArrayTags])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mod: 'onTouched' });

  let historyObj = useNavigate();
  const onSubmit = (data) => {
    const newData = { ...data };
    newData.tags = tagsList.map((tag) => tag.name);
    const forUpdateArticle = { newData, currentSlug };
    if(isNew) {
      dispatch(createArticle(newData))
      addNotification('Article successfully created')
    } else {
      dispatch(updateArticle(forUpdateArticle))
      addNotification('Article successfully updated')
    }
    historyObj('/articles');
  };


  return (
    <div className={classes.contentCreate}>
      <form className={classes.newArticle}>
        <span className={classes.header}>{isNew ? 'Create new article' : 'Edit article'}</span>
        <div className={classes.main}>
          <div className={classes.twoValue}>
            <span className={classes.name}>Title</span>
            <div className={classes.inputSection}>
              <input
                {...register('title', {
                  validate: (value) => !!value.trim(),
                  required: true,
                  minLength: 6,
                  maxLength: 100,
                })}
                placeholder={'Title'}
                type={'text'}
                defaultValue={isNew ? '' : article.title}
                className={`${classes.input} ${errors.title && classes.class}`}
              />
              {/* {errors.title && <span style={{ color: 'red' }}>Required</span>} */}
              {errors?.title && errors.title.type === 'validate' && (
                <span style={{ color: 'red' }}>No validate data</span>
              )}
              {errors?.title && errors.title.type === 'required' && <span style={{ color: 'red' }}>Required</span>}
              {errors?.title && errors.title.type === 'minLength' && (
                <span style={{ color: 'red' }}>Min length 6 characters</span>
              )}
              {errors?.title && errors.title.type === 'maxLength' && (
                <span style={{ color: 'red' }}>Max length 100 characters</span>
              )}
            </div>
          </div>
          <div className={classes.twoValue}>
            <div className={classes.nameFiled}>
              <span className={classes.name}>Short description</span>
            </div>
            <div className={classes.inputSection}>
              <input
                {...register('description', {
                  validate: (value) => !!value.trim(),
                  required: true,
                  minLength: 6,
                  maxLength: 100,
                })}
                defaultValue={isNew ? '' : article.description}
                placeholder={'Short description'}
                type={'text'}
                className={`${classes.input} ${errors.description && classes.class}`}
              />
              {/* {errors?.description && <span style={{ color: 'red' }}>Required</span>} */}
              {errors?.description && errors.description.type === 'validate' && (
                <span style={{ color: 'red' }}>No validate data</span>
              )}
              {errors?.description && errors.description.type === 'required' && (
                <span style={{ color: 'red' }}>Required</span>
              )}
              {errors?.description && errors.description.type === 'minLength' && (
                <span style={{ color: 'red' }}>Min length 6 characters</span>
              )}
              {errors?.description && errors.description.type === 'maxLength' && (
                <span style={{ color: 'red' }}>Max length 100 characters</span>
              )}
            </div>
          </div>
          <div className={classes.textValue}>
            <div className={classes.nameFiled}>
              <span className={classes.name}>Text</span>
            </div>
            <div className={classes.inputSection}>
              <textarea
                {...register('body', {
                  validate: (value) => !!value.trim(),
                  required: true,
                  minLength: 6,
                  maxLength: 1000,
                })}
                placeholder={'Text'}
                defaultValue={isNew ? '' : article.body}
                type={'text'}
                className={`${classes.inputText} ${errors.body && classes.class}`}
              />
              {errors?.body && errors.body.type === 'validate' && (
                <span style={{ color: 'red' }}>No validate data</span>
              )}
              {errors?.body && errors.body.type === 'required' && <span style={{ color: 'red' }}>Required</span>}
              {errors?.body && errors.body.type === 'minLength' && (
                <span style={{ color: 'red' }}>Min length 6 characters</span>
              )}
              {errors?.body && errors.body.type === 'maxLength' && (
                <span style={{ color: 'red' }}>Max length 1000 characters</span>
              )}
            </div>
          </div>
          <div className={classes.classTags}>
            <span className={classes.name}>Tags</span>
            {tagsList?.map((tag) => {
              return (
                <div key={tag.id} className={classes.tagBlock}>
                  <span className={classes.tag}>
                    {tag.name}
                  </span>
                  <button
                    type="button"
                    className={classes.delete}
                    onClick={() => setTagsList(tagsList.filter((item) => tag.id !== item.id))}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
            <div className={classes.addTag}>
              <input
                {...register('tags', { minLength: 6, maxLength: 100 })}
                value={name}
                placeholder={'Tag'}
                type={'text'}
                className={classes.tagInput}
                onChange={(e) => setTag(e.target.value)}
              />
              <button className={classes.delete} type="button">
                Delete
              </button>
              <button
                type="button"
                className={classes.buttonAdd}
                onClick={() => {
                  if (name.trim() === '') return;
                  setTagsList([...tagsList, { id: nextId, name: name }]);
                  setTag('');
                }}
              >
                Add tag
              </button>
            </div>
            {/* {errors?.tag && errors.tag.type === 'validate' && <span style={{ color: 'red' }}>No validate data</span>}
            {errors?.tag && errors.tag.type === 'minLength' && (
              <span style={{ color: 'red' }}>Min length 6 characters</span>
            )}
            {errors?.tag && errors.tag.type === 'maxLength' && (
              <span style={{ color: 'red' }}>Max length 1000 characters</span>
            )} */}
          </div>
          <div className={classes.login}>
            <button className={classes.buttonSend} onClick={handleSubmit(onSubmit)}>
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
