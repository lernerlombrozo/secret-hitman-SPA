import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GameService } from './../../game.service';
import { AuthService } from 'src/app/auth.service';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: "app-win-screen",
  templateUrl: "./win-screen.component.html",
  styleUrls: ["./win-screen.component.scss"]
})
export class WinScreenComponent implements OnInit {
  @Input() show: boolean;
  @Output() onHide = new EventEmitter();
  constructor(
    private http: HttpClient,
    public gameService: GameService,
    public authService: AuthService,
    public backendService: BackendService
  ) {}

  ngOnInit() {}

  goHome() {
    this.gameService.gameId = null;
    this.gameService.game = null;
  }

  close() {
    this.onHide.emit();
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
        }
      );
  }
}
