import { Component } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { IAccesso } from '../../models/ipost';
import { AuthenticatorService } from '../../services/authenticator.service';
import { JwtConfig } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    public utilities:UtilitiesService,
    public configServices:ConfigService,
    private authServices:AuthenticatorService,
    private router:Router
  ){
    this.loginForm= new FormGroup({
      email: new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexEmail)]),
      password: new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexPasswordCheck)]),
      rememberMe: new FormControl(false)
    })
  }
  loginForm:FormGroup;
  errorLogin:boolean = false;

  submit(){
    if (this.loginForm.invalid){ 
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authServices.login(this.loginForm.value as IAccesso).subscribe({
      next: data => {
        console.log(data);
        this.router.navigateByUrl("/Account")
      },
      error: error => {
        console.log(error);
        this.errorLogin=true;
      }
    })
  }
}
