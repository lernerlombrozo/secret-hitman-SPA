import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BackendService } from './../backend.service';
import { GameService } from './../game.service';
import { AuthService } from '../auth.service';

import OpenSocket from 'socket.io-client';

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  @ViewChild("chat") chat: ElementRef;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    public backendService: BackendService,
    public gameService: GameService
  ) {}

  showAlert = false;
  messageToShow = "";
  message = "";

  modal = {
    show: false,
    message: null
  };

  discard = {
    show: false
  };

  instructions = "Algo va a ir aquí";

  ngOnInit() {
    const socket = OpenSocket(this.backendService.backendUrl);
    this.openGameSocket(socket);
    this.openChatSocket(socket);
    this.getChat();
    this.gameService.getMyName();
    this.gameService.getInstructions();
  }

  openGameSocket(socket) {
    socket.on(
      `game/${this.gameService.gameId}` /*same name as in backend*/,
      data => {
        console.log("socket Data: ", data);
        this.gameService.getMyOrder();
        this.gameService.game = data.game;
        if (data.action === "player-joined") {
          const alertToShow = this.gameService.game.players[
            this.gameService.game.players.length - 1
          ].player.name + " has joined the game!";
          this.showNewAlert(alertToShow);
        } else if (data.action) {
          console.log(data.action);
          this.showNewAlert(data.action);
        }
        this.gameService.getInstructions();
      }
    );
  }

  openChatSocket(socket) {
    socket.on(
      `game/chat/${this.gameService.gameId}` /*same name as in backend*/,
      data => {
        this.gameService.chat = data.chat.messages;
        setTimeout(() => {
          this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
        }, 10);
      }
    );
  }

  getChat() {
    this.http
      .get(
        `${this.backendService.backendUrl}/chat/get-chat?gameId=${
          this.gameService.gameId
        }`,
        this.authService.httpOptions
      )
      .subscribe(
        (res: any) => {
          this.gameService.chat = res.chat.messages;
          setTimeout(() => {
            this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
          }, 10);
        },
        err => {
          console.log(err);
          if (err.status !== 404) {
            this.modal = {
              show: true,
              message: err.error.message
            };
          }
        }
      );
  }

  showNewAlert(message, additional = "") {
    this.messageToShow = message + additional;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  sendMessage() {
    this.http
      .post(
        `${this.backendService.backendUrl}/chat/new-message`,
        {
          gameId: this.gameService.gameId,
          message: this.message,
          chatId: this.gameService.game.chat
        },
        this.authService.httpOptions
      )
      .subscribe(
        (res: any) => {
            this.message = "";
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

  closeWinScreen() {
    this.gameService.game.action = "stay in game";
  }

  discardTile(cardIndex: number) {
    if (this.gameService.game.action === "president examines top 3 cards") {
      this.http
        .put(
          `${this.backendService.backendUrl}/game/executive-action`,
          {
            gameId: this.gameService.gameId
          },
          this.authService.httpOptions
        )
        .subscribe(
          (res: any) => {
            this.discard.show = false;
          },
          err => {
            console.log(err);
            this.modal = {
              show: true,
              message: err.error.message
            };
          }
        );
    } else {
      this.http
        .put(
          `${this.backendService.backendUrl}/game/discard-policy-tile`,
          {
            gameId: this.gameService.gameId,
            card: cardIndex
          },
          this.authService.httpOptions
        )
        .subscribe(
          (res: any) => {
            this.discard.show = false;
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

  imPresident(){
    if (this.gameService.game.temporaryPresident){
        return this.gameService.myOrder === this.gameService.game.temporaryPresident;
    }
    return this.gameService.myOrder === this.gameService.game.president;
  }
}
