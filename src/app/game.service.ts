import { BackendService } from './backend.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: "root"
})
export class GameService {
  constructor(
    public authService: AuthService,
    public http: HttpClient,
    public backendService: BackendService
  ) {}

  godMode = true; // TODO: should be false

  gameId = null;

  myOrder = null;

  game = null;

  chat = null;

  userName = null;

  instructions = "";

  getMyRole() {
    return this.game.players.find(
      player => player.player._id === this.authService.userId
    ).role;
  }

  getMyName() {
    this.userName = this.game.players.find(
      player => player.player._id === this.authService.userId
    ).player.name;
    return this.userName;
  }

  getMyOrder() {
    this.myOrder = this.game.players.findIndex(
      player => player.player._id === this.authService.userId
    );
  }

  getName(governmentRole: string) {
    const roles = [
      "president", // should also include temporary president
      "chancellor",
      "lastPresident",
      "lastChancellor"
    ];
    if (roles.indexOf(governmentRole) >= 0) {
      if(governmentRole === "president" && this.game.temporaryPresident !== null){
          return this.game.players[this.game.temporaryPresident].player.name;
      }
      return this.game.players[this.game[governmentRole]].player.name || null;
    } else {
      return "must be president, chancellor, lastPresident or lastChancellor";
    }
  }

  getInstructions() {
    var gameAction = this.game.action;
    if (gameAction == "nominate a chancellor") {
      if (this.imPresident()) {
        this.instructions = "Propose a chancellor";
      } else {
        this.instructions = `President ${this.getName(
          "president"
        )} chooses chancellor`;
      }
    }
    if (gameAction == "vote") {
      if (this.game.players[this.myOrder].vote === null) {
        this.instructions = "Vote";
      } else {
        this.instructions = "Wait for other players to vote";
      }
    }
    if (gameAction == "president discards") {
      if (this.imPresident()) {
        this.instructions = "Discard a policie";
      } else {
        this.instructions = `President ${this.getName(
          "president"
        )} discards a policie`;
      }
    }
    if (gameAction == "chancellor discards") {
      if (this.game.chancellor === this.myOrder) {
        this.instructions = "Discard a policie";
      } else {
        this.instructions = `Chancellor ${this.getName(
          "chancellor"
        )} discards a policie`;
      }
    }
    if (gameAction == "president investigates player") {
      if (this.imPresident()) {
        this.instructions = "Investigate a player";
      } else {
        this.instructions = `President ${this.getName(
          "president"
        )} investigates a player`;
      }
    }
    if (gameAction == "president picks president") {
      if (this.imPresident()) {
        this.instructions = "Choose the next presidential candidate";
      } else {
        this.instructions = `President ${this.getName(
          "president"
        )} chooses the next presidential candidate`;
      }
    }
    if (gameAction == "president kills") {
      if (this.imPresident()) {
        this.instructions = "Kill a player";
      } else {
        this.instructions = `President ${this.getName(
          "president"
        )} kills a player`;
      }
    }
    if (gameAction == "president examines top 3 cards") {
      if (this.imPresident()) {
        this.instructions = "Examine top 3 cards";
      } else {
        this.instructions = `President ${this.getName(
          "president"
        )} examines top 3 cards`;
      }
    }
  }

  imPresident() {
    if (this.game.temporaryPresident) {
      return (
        this.myOrder === this.game.temporaryPresident
      );
    }
    return this.myOrder === this.game.president;
  }
}
