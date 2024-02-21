import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getArticles = createAsyncThunk('main/getArticles', async (offsetStep, { getState }) => {
  const { main } = getState();
  const response = await fetch(`${main.URL}/api/articles?limit=5&offset=${offsetStep}`);
  return response.json();
});

const createUser = createAsyncThunk('main/createUser', async (data, { getState }) => {
  const { main } = getState();
  const response = await fetch(`${main.URL}/api/users`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      user: {
        username: data.username, 
        email: data.email,
        password: data.password,
      },
    }),
  })
  return response.json()
});

const entranceUser = createAsyncThunk('main/entranceUser', async (data, { getState }) => {
    const { main } = getState();
    const response = await fetch(`${main.URL}/api/users/login`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          email: data.email,
          password: data.password,
        },
      }),
      
    })
    return response.json()
  }) 

  const getUser = createAsyncThunk('main/getUser', async (_, { getState }) => {
    const { main } = getState();
    let token = localStorage.getItem('token')
    return fetch(`${main.URL}/api/user`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },      
    })
    .then(response => response.json())
  }) 

  const updateUser = createAsyncThunk('main/updateUser', async (data, { getState }) => {
    const { main } = getState();
    let token = localStorage.getItem('token')
    return fetch(`${main.URL}/api/user`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        user: {
          email: data.email,
          username: data.username,
          password: data.password,
          image: data.image
        }
      }),
    })
    .then(response => response.json())
  }) 

  const createArticle = createAsyncThunk('main/createArticle', async (data, { getState }) => {
    const { main } = getState();
    let token = localStorage.getItem('token')
    const response = await fetch(`${main.URL}/api/articles`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        article: {
          title: data.title, 
          description: data.description,
          body: data.body,
          tagList: data.tags,
        },
      }),
    })
    return response.json()
  });

  const getArticle = createAsyncThunk('main/getArticle', async (slug, { getState }) => {
    const { main } = getState();
    return fetch(`${main.URL}/api/articles/${slug}`, {
      method: 'GET',
    })
    .then(response => response.json())
  }) 

  const deleteArticle = createAsyncThunk('main/deleteArticle', async (slug, { getState }) => {
    const { main } = getState();
    let token = localStorage.getItem('token')
    return fetch(`${main.URL}/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
  }) 

  const updateArticle = createAsyncThunk('main/updateArticle', async (dataUpdate, { getState }) => {
    const { newData, currentSlug } = dataUpdate;
    const { main } = getState();
    let token = localStorage.getItem('token')
    return fetch(`${main.URL}/api/articles/${currentSlug}`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        article: {
          title: newData.title,
          description: newData.description,
          body: newData.body,
          tagList: newData.tags
        }
      }),
    })
    .then(response => response.json())
  }) 

const initialState = {
  articlesFromServer: [],
  article: [],
  URL: 'https://blog.kata.academy',
  currentPage: 1,
  offsetStep: 0,
  totalPages: 0,
  username: '',
  email: '',
  token: '',
  bio: '',
  image: '',
  tags: [],
  loading: false,
  notificationState: {}
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    logoutUser(state) {
      state.username = '';
      state.email = '';
      state. token = '';
    },
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(getArticles.fulfilled, (state, action) => {
      state.articlesFromServer = action.payload.articles;
      state.totalPages = action.payload.articlesCount;
      state.loading = false;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.username = action.payload.user?.username;
      state.email = action.payload.user?.email;
      state.token = action.payload.user?.token;
      state.loading = false;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.username = action.payload.user?.username;
      state.email = action.payload.user?.email;
      state.token = action.payload.user?.token;
      state.bio = action.payload.user?.bio;
      state.image = action.payload.user?.image;
      state.loading = false;
    })
    .addCase(getArticle.fulfilled, (state, action) => {
      state.article = action.payload.article;
    })
    .addCase(getArticles.pending, (state) => {
      state.loading = true;
    })
    .addCase(getUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateUser.pending, (state) => {
      state.loading = true;
    })
  },
});

export { getArticles, entranceUser, createUser, getUser, updateUser, createArticle, getArticle, deleteArticle, updateArticle };
export const { setPage, logoutUser, setTags } = mainSlice.actions;

export default mainSlice.reducer;
