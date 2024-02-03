import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getArticles = createAsyncThunk('main/getArticles', async (offsetStep, { getState }) => {
  const { main } = getState();
  const response = await fetch(`${main.URL}/api/articles?limit=5&offset=${offsetStep}`);
  return response.json();
});

export const createUser = () => {
   fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json:charset=utf-8',
    },
    body: JSON.stringify({
      user: {
        username: 'qwery123588',
        email: 'myEmailqwery88@mail.ru',
        password: '1234569qwe88',
      },
    }),
  }).then((response) => {
    console.log(response, '12345');
  });
};

const initialState = {
  articlesFromServer: [],
  URL: 'https://blog.kata.academy',
  currentPage: 1,
  offsetStep: 0,
  totalPages: 0,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticles.fulfilled, (state, action) => {
      state.articlesFromServer = action.payload.articles;
      state.totalPages = action.payload.articlesCount;
    });
    // state.offsetStep = (state.currentPage - 1) * 5;
    // state.currentPage += state.currentPage;
  },
});

export { getArticles };
export const { setPage } = mainSlice.actions;

export default mainSlice.reducer;
