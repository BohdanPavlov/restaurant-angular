import { Action, createReducer, on } from '@ngrx/store';
import {
  fetchNewsAction,
  fetchNewsFailureAction,
  fetchNewsSuccessAction,
} from 'src/app/news/store/actions/fetch-news.action';

import { NewsStateInterface } from 'src/app/news/types/news-state.interface';

const initialState: NewsStateInterface = {
  news: null,
  status: 'idle',
  errorMessage: '',
};

const newsReducer = createReducer(
  initialState,
  on(fetchNewsAction, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(fetchNewsSuccessAction, (state, action) => ({
    ...state,
    status: 'success',
    news: action.news,
    errorMessage: '',
  })),
  on(fetchNewsFailureAction, (state, action) => ({
    ...state,
    status: 'error',
    errorMessage: action.errorMessage,
  })),
);

export function reducer (state: NewsStateInterface, action: Action) {
  return newsReducer(state, action);
}
