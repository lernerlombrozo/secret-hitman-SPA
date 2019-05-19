import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BackendService } from './../../backend.service';
import { GameService } from 'src/app/game.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.scss"]
})
export class PlayersComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public backendService: BackendService,
    public gameService: GameService,
    public authService: AuthService
  ) {}

  modal = {
    show: false,
    message: null
  };

  change = false;

  ngOnInit() {
    this.authService.userIdFaked.subscribe(() => (this.change = !this.change));
  }

  selectPlayer(index) {
    this.gameService.getMyOrder();
    if (!this.gameService.game.started) {
      return;
    }
    // if you are president and no chancellor has been selected
    if (
      this.imPresident() &&
      !this.gameService.game.chancellor &&
      this.gameService.game.action === "nominate a chancellor"
    ) {
      this.proposeChancellor(index);
    } else if (this.imPresident()) {
      this.killOrInvestigate(index);
    }
  }

  proposeChancellor(index) {
    this.http
      .put(
        `${this.backendService.backendUrl}/game/propose-chancellor`,
        {
          chancellor: index,
          gameId: this.gameService.gameId
        },
        this.authService.httpOptions
      )
      .subscribe(
        (res: any) => {},
        err => {
          console.log(err);
          this.modal = {
            show: true,
            message: err.error.message
          };
        }
      );
  }

  killOrInvestigate(index) {
    this.http
      .put(
        `${this.backendService.backendUrl}/game/executive-action`,
        {
          selectedPlayer: index,
          gameId: this.gameService.gameId
        },
        this.authService.httpOptions
      )
      .subscribe(
        (res: any) => {},
        err => {
          console.log(err);
          this.modal = {
            show: true,
            message: err.error.message
          };
        }
      );
  }

  closeModal() {
    this.modal.show = false;
  }

  imPresident() {
    if (this.gameService.game.temporaryPresident) {
      return (
        this.gameService.myOrder === this.gameService.game.temporaryPresident
      );
    }
    return this.gameService.myOrder === this.gameService.game.president;
  }

  isPresident(index){
    if (this.gameService.game.temporaryPresident) {
      return (
        index === this.gameService.game.temporaryPresident
      );
    }
    return index === this.gameService.game.president;
  }
}
