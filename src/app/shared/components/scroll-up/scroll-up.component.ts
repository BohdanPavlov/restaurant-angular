import { Component, HostListener } from '@angular/core';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scroll-up',
  templateUrl: './scroll-up.component.html',
  styleUrls: ['./scroll-up.component.scss'],
})
export class ScrollUpComponent {
  public showButton = false;
  public faAngleUp = faAngleUp;

  @HostListener('window:scroll', [])

  onWindowScroll () {
    this.showButton = window.scrollY > 200;
  }

  scrollToTop () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
