import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { FetchNewsEffect } from 'src/app/news/store/effects/fetch-news.effect';

import { reducer } from 'src/app/news/store/reducers';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BannerComponent } from './components/banner/banner.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { NewsVoteComponent } from './components/news-vote/news-vote.component';
import { NewsComponent } from './pages/news/news.component';

@NgModule({
  declarations: [
    NewsComponent,
    BannerComponent,
    NewsItemComponent,
    NewsVoteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('news', reducer),
    EffectsModule.forFeature([FetchNewsEffect]),
    SharedModule,
    MaterialModule,
    TranslateModule,
  ],
})
export class NewsModule {}
