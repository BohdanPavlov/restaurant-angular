import { createAction, props } from '@ngrx/store';
import { NewsActionTypes } from 'src/app/news/store/action-types';
import { INews } from 'src/app/news/types/news.interface';

export const fetchNewsAction = createAction(
  NewsActionTypes.FETCH_NEWS,
);
export const fetchNewsSuccessAction = createAction(
  NewsActionTypes.FETCH_NEWS_SUCCESS,
  props<{ news: INews[] }>(),
);
export const fetchNewsFailureAction = createAction(
  NewsActionTypes.FETCH_NEWS_FAILURE,
  props<{ errorMessage: string }>(),
);
