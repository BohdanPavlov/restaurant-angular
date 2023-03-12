import { INews } from 'src/app/news/types/news.interface';

export interface NewsStateInterface {
  news: INews[] | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string;
}
