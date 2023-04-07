import { Component } from '@angular/core';

@Component({
  selector: 'app-news-vote',
  templateUrl: './news-vote.component.html',
  styleUrls: ['./news-vote.component.scss'],
})
export class NewsVoteComponent {
  public isSubmitted: boolean = false;

  public onSubmit() {
    this.isSubmitted = true;
  }
}
