import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INews } from 'src/app/news/types/news.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  public constructor(private http: HttpClient) {}

  public fetchNews(): Observable<INews[]> {
    const url = environment.apiBase + 'news';
    return this.http.get<INews[]>(url);
  }
}
