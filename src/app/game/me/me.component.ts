import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from 'src/app/backend.service';
import { GameService } from 'src/app/game.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: "app-me",
  templateUrl: "./me.component.html",
  styleUrls: ["./me.component.scss"]
})
export class MeComponent implements OnInit {
  @Input() role: string;

  roleImage: string;

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

  ngOnInit() {
    this.roleImage = `assets/img/roles/${this.role}.png`;
  }

  ngOnChanges() {
    this.roleImage = `assets/img/roles/${this.role}.png`;
  }

  vote(voteFor) {
    if (!this.gameService.game.started) {
      return;
    }
    // if you are president and no chancellor has been selected
    if (
      this.gameService.game.president !== null &&
      this.gameService.game.chancellor !== null
      // && this.gameService.game.players[this.gameService.myOrder].vote === null
    ) {
      this.http
        .put(
          `${this.backendService.backendUrl}/game/vote`,
          {
            vote: voteFor,
            gameId: this.gameService.gameId
          },
          this.authService.httpOptions
        )
        .subscribe(
          (res: any) => {
            this.gameService.getInstructions();
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

  closeModal() {
    this.modal.show = false;
  }
}
