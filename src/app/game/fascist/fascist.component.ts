import { Component, OnInit, Input } from '@angular/core';

import { GameService } from './../../game.service';

@Component({
  selector: 'app-fascist',
  templateUrl: './fascist.component.html',
  styleUrls: ['./fascist.component.scss']
})
export class FascistComponent implements OnInit {
  @Input() players: number;
  constructor(public gameService: GameService) { }

  image = null;

  ngOnInit() {
    let i: number;
    i = this.players % 2 === 1 ? this.players : this.players - 1;
    this.image = `assets/img/board/fascist/${i}-${i + 1}/${i}-${i + 1}.png`;
  }

}
