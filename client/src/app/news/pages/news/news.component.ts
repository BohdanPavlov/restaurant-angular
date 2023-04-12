import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fetchNewsAction } from 'src/app/news/store/actions/fetch-news.action';
import { newsSelector, newsStatusSelector } from 'src/app/news/store/selectors';
import { INews } from 'src/app/news/types/news.interface';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  public news$!: Observable<INews[]>;
  public status$!: Observable<string>;

  public constructor(private store: Store<AppStateInterface>) {}

  public ngOnInit(): void {
    this.store.dispatch(fetchNewsAction());
    this.news$ = this.store.pipe(select(newsSelector));
    this.status$ = this.store.pipe(select(newsStatusSelector));
  }
}
