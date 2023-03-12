import { Component, Input, OnInit } from '@angular/core';
import { INews } from 'src/app/news/types/news.interface';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit {
  @Input() news!: INews;

  constructor () { }

  ngOnInit (): void {
    console.log(this.news);
  }

}
