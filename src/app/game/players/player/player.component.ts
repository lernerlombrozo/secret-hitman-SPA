import { Component, OnInit, Input } from '@angular/core';

import { GameService } from './../../../game.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"]
})
export class PlayerComponent implements OnInit {
  @Input() player;
  @Input() playerNumber;
  @Input() president;
  @Input() chancellor;
  @Input() change;

  constructor(
    public gameService: GameService,
    public authService: AuthService
  ) {}

  image: string;

  ngOnInit() {
    this.assignImage();
  }

  ngOnChanges() {
    if (this.player.secretIdentity) {
      this.image = `assets/img/party-membership/${
        this.player.secretIdentity
      }.png`;
    }
    this.assignImage();
  }

  assignImage(){
    const myRole = this.gameService.getMyRole();
    if (myRole) {
      if (
        myRole === "fascist" ||
        (myRole === "hitler" && this.gameService.game.players.length < 7) ||
        this.player.player._id === this.authService.userId
      ) {
        this.image = `assets/img/roles/${this.player.role}.png`;
      }else if(this.gameService.game.players[this.gameService.myOrder].knows.indexOf(this.playerNumber)>=0){
          if(this.player.role !=="hitler"){
            this.image = `assets/img/roles/${this.player.role}.png`;
          }else{
            this.image = `assets/img/roles/fascist.png`;
          }
      }else{
        this.image = "assets/img/roles/secret.png";
      }
    } else {
      this.image = "assets/img/roles/secret.png";
    }
  }
}
