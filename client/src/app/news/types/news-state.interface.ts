import { INews } from 'src/app/news/types/news.interface';

export interface NewsStateInterface {
  news: INews[];
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string;
}
