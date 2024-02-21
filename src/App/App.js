import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { Layout } from '../components/Layout/Layout';
import { Articles } from '../components/Articles/Articles';
import { OneArticleCard } from '../components/OneArticleCard/OneArticleCard';
import { NewAccount } from '../components/NewAccount/NewAccount';
import { SignInPage } from '../components/SignInPage/SignInPage';
import { EditProfile } from '../components/EditProfile/EditProfile';
import { NewArticle } from '../components/NewArticle/NewArticle';


export const App = () => {

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setMessage] = useState('')
  const snackbarClose = () => {
    setOpen(false)
  }

  const addNotification = (message) => {
    setOpen(true)
    setMessage(message)
  }


  return (
    <div>
      <Snackbar 
      message={snackbarMessage} 
      autoHideDuration={3000}
      open={open}
      onClose={snackbarClose}
      action={[
        <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={snackbarClose}
        >
        </IconButton>
      ]}
      />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<OneArticleCard addNotification={addNotification}/>} />
          <Route path="/account" element={<NewAccount addNotification={addNotification}/>} />
          <Route path="/signIn" element={<SignInPage addNotification={addNotification}/>} />
          <Route path="/editProfile" element={<EditProfile addNotification={addNotification}/>} />
          <Route path="/newArticle" element={<NewArticle addNotification={addNotification}/>} />
          <Route path="/articles/:slug/edit" element={<NewArticle addNotification={addNotification}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
};
