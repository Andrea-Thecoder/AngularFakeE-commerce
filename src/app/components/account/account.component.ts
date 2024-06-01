import { Component } from '@angular/core';
import { AuthenticatorService } from '../../services/authenticator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  constructor(
    private authServices:AuthenticatorService,
    private router:Router
  ){}

  utente = [];
  ngOnInit():void{
    const userId:string = this.authServices.UserId;
    this.authServices.getUserProfile(userId).subscribe({
      next: data => {
        console.log(data);
        this.utente = data;
      }
    })
  }

  logout():void{
    this.authServices.logOut();
    this.router.navigateByUrl('/Home')
  }

}
