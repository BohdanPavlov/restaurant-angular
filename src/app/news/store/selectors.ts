import { createSelector } from '@ngrx/store';
import { NewsStateInterface } from 'src/app/news/types/news-state.interface';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

export const newsFeatureSelector = (
  state: AppStateInterface,
): NewsStateInterface => state.news;

export const newsSelector = createSelector(
  newsFeatureSelector,
  (state) => state.news,
);

