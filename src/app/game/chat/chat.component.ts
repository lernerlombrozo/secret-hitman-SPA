import { AuthService } from './../../auth.service';
import { GameService } from 'src/app/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    public gameService: GameService,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

}
