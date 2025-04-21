import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-boton',
  imports: [],
  standalone: true,
  templateUrl: './boton.component.html',
  styleUrl: './boton.component.css',
})
export class BotonComponent {
  @Input() texto = 'dale-click';
  @Input() color = 'black';
  @Output() onClick = new EventEmitter();
  
  clicked() {
    this.onClick.emit()
  }
}
