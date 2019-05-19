import { Component, OnInit } from '@angular/core';

import { GameService } from './../../game.service';

@Component({
  selector: 'app-liberal',
  templateUrl: './liberal.component.html',
  styleUrls: ['./liberal.component.scss']
})
export class LiberalComponent implements OnInit {
  constructor(public gameService: GameService) { }

  image = 'assets/img/board/liberal/liberal.png';

  ngOnInit() {}

}
