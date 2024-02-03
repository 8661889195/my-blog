import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import { getArticles, setPage } from '../services/mainSlice';
import classes from './Articles.module.css';

export const Articles = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state.main)

  useEffect(() => {
    const first = window.localStorage.getItem('page')
    dispatch(setPage(first))
  }, [])
  useEffect(() => {
    dispatch(getArticles((currentPage - 1) * 5))
  }, [currentPage])

  const articlesFromServer = useSelector((state) => state.main.articlesFromServer);

  return(
    <div className={classes.blockBlock}>
      {articlesFromServer?.map((userPage) => {
        return <ArticleCard key={`${userPage.slug}`} {...userPage} />
      })}
      <Pagination style={{textAlign: 'center'}}
      onChange={(page) => {
        window.localStorage.setItem('page', page)
        dispatch(setPage(page))}}
      defaultCurrent={1}
      showChanger={false}
      total={totalPages}
      defaultPageSize={5}
      current={currentPage}
      />
    </div>
  );
};
