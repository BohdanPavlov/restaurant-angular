import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsVoteComponent } from './news-vote.component';

describe('NewsVoteComponent', () => {
  let component: NewsVoteComponent;
  let fixture: ComponentFixture<NewsVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsVoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
