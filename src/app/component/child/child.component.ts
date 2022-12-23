import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  constructor() { }
  @Input() name: string = "d";
  ngOnInit(): void {
  }

  @Output() sendMessageEmitter = new EventEmitter();

  messageToParent(e: any) {
    this.sendMessageEmitter.emit(e.target.value);

  }
}
