import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() show: boolean;
  @Input() message: string;
  @Output() onHide = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.onHide.emit();
  }

}
