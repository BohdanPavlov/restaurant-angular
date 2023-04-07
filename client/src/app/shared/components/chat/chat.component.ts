import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  private socket!: Socket;
  private destroy$: Subject<void> = new Subject<void>();
  public faComment = faCommentAlt;

  public isVisible: boolean = false;
  public message!: string;
  public messages: { message: string }[] | [] = [];

  public ngOnInit() {
    this.socket = io('http://localhost:3030');

    this.socket.on('update', (messages: { message: string }[] | []) => {
      this.messages = messages;
    });
  }

  public sendMessage() {
    this.socket.emit('create', { message: this.message });
    this.message = '';
  }

  public closeChat() {
    this.isVisible = false;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
