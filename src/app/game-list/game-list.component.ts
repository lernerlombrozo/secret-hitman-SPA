import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';
import { AuthService } from '../auth.service';
import { GameService } from '../game.service';

@Component({
  selector: "app-game-list",
  templateUrl: "./game-list.component.html",
  styleUrls: ["./game-list.component.scss"]
})
export class GameListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private backendService: BackendService,
    private authService: AuthService,
    public gameService: GameService
  ) {}

  games: any;
  toDelete=7;

  modal = {
    show: false,
    message: null
  };

  ngOnInit() {
    this.getGames();
  }

  reload() {
    this.getGames();
  }

  getGames() {
    this.http
      .get(
        `${this.backendService.backendUrl}/game/all-games`,
        this.authService.httpOptions
      )
      .subscribe(
        (res: any) => {
          this.games = res.games;
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

  joinGame(gameId) {
    this.http
      .put(
        `${this.backendService.backendUrl}/game/join`,
        { gameId },
        this.authService.httpOptions
      )
      .subscribe(
        (res: any) => {
          this.gameService.game = res.game;
          this.gameService.gameId = res.game._id;
          this.gameService.getMyOrder();
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

  closeModal() {
    this.modal.show = false;
  }

  countToDelete(game){
    if(!this.gameService.godMode){
      return
    }
    if (!game.counterToDelete){
      game.counterToDelete = 1;
    } else {
      game.counterToDelete ++
      if (game.counterToDelete > this.toDelete){
        this.http
          .post(
            `${this.backendService.backendUrl}/game/delete-game`,
            { gameId: game._id },
            this.authService.httpOptions
          )
          .subscribe(
            (res: any) => {
              this.modal = {
                show: true,
                message: "Game was deleted!!"
              };
              this.delete(game._id);
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
    }
  }

  delete(gameId){
    gameId
    var toDelete = this.games.find(function(game) {
      return game._id === gameId;
    });
    this.games.splice(toDelete,1)
  }
}
