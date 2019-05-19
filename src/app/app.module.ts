import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PasswordComponent } from './auth/password/password.component';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from './auth/auth.guard.service';
import { NotAuthGuard } from './auth/not-auth.guard.service';
import { CockpitComponent } from './cockpit/cockpit.component';
import { GameListComponent } from './game-list/game-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LiberalComponent } from './game/liberal/liberal.component';
import { FascistComponent } from './game/fascist/fascist.component';
import { PlayersComponent } from './game/players/players.component';
import { MeComponent } from './game/me/me.component';
import { ChatComponent } from './game/chat/chat.component';
import { PlayerComponent } from './game/players/player/player.component';
import { ModalComponent } from './modal/modal.component';
import { DiscardComponent } from './game/discard/discard.component';
import { WinScreenComponent } from './game/win-screen/win-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    PasswordComponent,
    CockpitComponent,
    GameListComponent,
    PaginationComponent,
    LiberalComponent,
    FascistComponent,
    PlayersComponent,
    MeComponent,
    ChatComponent,
    PlayerComponent,
    ModalComponent,
    DiscardComponent,
    WinScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
