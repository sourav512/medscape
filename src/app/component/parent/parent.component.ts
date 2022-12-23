import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  constructor() { }
  name: string = '';
  dataFromChild!: string;
  ngOnInit(): void {
  }

  recievedMessage(msg: any) {
    this.dataFromChild = msg;
  }

}
