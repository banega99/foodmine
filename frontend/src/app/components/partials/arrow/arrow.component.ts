import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.css']
})

@Injectable({
  providedIn: "root"
})
export class ArrowComponent implements OnInit {

  @Input()
  left: string = 'left';

  @Input()
  opacity: string = ''


  @Output('onClick')
  handleClick = new EventEmitter

  constructor() { }

  ngOnInit(): void {
  }


}
