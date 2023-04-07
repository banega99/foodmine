import { Component, Input } from '@angular/core';

@Component({
  selector: 'zero-orders',
  templateUrl: './zero-orders.component.html',
  styleUrls: ['./zero-orders.component.css']
})
export class ZeroOrdersComponent {
  // @Input() order = false

  @Input() userName!: string
}
