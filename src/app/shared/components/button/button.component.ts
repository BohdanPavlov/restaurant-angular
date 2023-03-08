import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() disabled: boolean = false;
  @Input() type: string = 'submit';
  @Input() classes?: string;

  constructor () { }

  ngOnInit (): void {
  }

}
