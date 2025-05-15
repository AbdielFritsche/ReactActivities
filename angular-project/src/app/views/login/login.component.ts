import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BotonComponent } from '../../boton/boton.component';

@Component({
  selector: 'app-login',
  imports: [BotonComponent,Router],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router:Router){

  }
  login(){
    this.router.navigate(['home']);
  }
}
