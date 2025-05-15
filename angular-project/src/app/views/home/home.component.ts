import { Component } from '@angular/core';
import { BotonComponent } from '../../boton/boton.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [BotonComponent,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'angular-project';
  edad = 0; 
  suma() {
    this.edad += 1;
  }

  resta() {
    this.edad -= 1;
  }

  getEdad(data:number) {
    this.edad = data;
  }
}
