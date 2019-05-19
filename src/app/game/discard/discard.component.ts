import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { GameService } from 'src/app/game.service';

@Component({
  selector: "app-discard",
  templateUrl: "./discard.component.html",
  styleUrls: ["./discard.component.scss"]
})
export class DiscardComponent implements OnInit {
  @Input() show: boolean;
  @Input() cards: string[];
  @Output() onDiscard = new EventEmitter();

  policiesPath: string[] = [];

  constructor(public gameService: GameService) {}

  ngOnInit() {
    this.resetPolicies();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnChanges() {
    this.resetPolicies();
  }

  resetPolicies() {
    this.policiesPath = [];
    for (const card of this.cards) {
      this.policiesPath.push(`assets/img/policies/${card}.png`);
    }
  }

  discard(index) {
    this.onDiscard.emit(index);
  }
}
