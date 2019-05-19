import { GameService } from './../game.service';
import { AuthService } from 'src/app/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public gameService: GameService
  ) {}

  fakeId = "";

  toggled = false;

  ngOnInit() {
    this.authService.userIdFaked.subscribe(() => {
      this.gameService.getMyOrder();
      this.gameService.getMyRole();
    });
  }

  onLogOut() {
    this.authService.logout();
  }

  cl() {
    console.log(this.authService.userId);
  }

  changeFakeId() {
    console.log("changed fakeId for: ", this.fakeId);
    if (this.gameService.godMode) {
      this.authService.setFakeId(this.fakeId);
      this.gameService.getInstructions();
    } else {
      alert("You are not God!");
    }
  }

  toggle(){
    console.log('toggling')
    this.toggled = !this.toggled;
  }
}
