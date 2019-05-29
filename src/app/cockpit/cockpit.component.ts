import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';
import { AuthService } from '../auth.service';
import { GameService } from './../game.service';

@Component({
  selector: "app-cockpit",
  templateUrl: "./cockpit.component.html",
  styleUrls: ["./cockpit.component.scss"]
})
export class CockpitComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public backendService: BackendService,
    public authService: AuthService,
    public gameService: GameService
  ) {}

  playerList = [6, 7, 8, 9, 10];
  players = 6;

  modal = {
    show: false,
    message: null
  };

  ngOnInit() {}

  makeNewGame() {
    console.log(
      "making new game",
      this.backendService.backendUrl,
      this.authService.httpOptions
    );
    this.http
      .post(
        `${this.backendService.backendUrl}/game/new-game`,
        {},
        this.authService.httpOptions
      )
      .subscribe(
        (res: any) => {
          this.gameService.gameId = res.game._id;
          this.gameService.game = res.game;
        },
        err => {
          err = err ? err.error ? err.error.message? err.error.message : err.error : err : "No f clue"
          console.log(err);
          this.modal = {
            show: true,
            message: err
          };
        }
      );
  }

  makeNewPopulatedGame() {
    this.http
      .post(
        `${this.backendService.backendUrl}/game/new-populated-game`,
        { players: this.players },
        this.authService.httpOptions
      )
      .subscribe(
        (res: any) => {
          this.gameService.gameId = res.game._id;
          this.gameService.game = res.game;
        },
        err => {
          console.log(err);
          this.modal = {
            show: true,
            message: err.error.message
          };
        }
      );
  }

  startGame() {
    this.http
      .put(
        `${this.backendService.backendUrl}/game/start`,
        { gameId: this.gameService.gameId },
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

  restartGame() {
    this.http
      .put(
        `${this.backendService.backendUrl}/game/restart`,
        { gameId: this.gameService.gameId },
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

  voteAll(vote: boolean) {
    this.http
      .put(
        `${this.backendService.backendUrl}/game/all-votes`,
        { gameId: this.gameService.gameId, vote },
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

  goHome() {
    this.gameService.gameId = null;
    this.gameService.game = null;
    this.gameService.chat=null;
  }

  cl(toLog:[]){
    console.warn('Logged: ', ...toLog)
  }
}
