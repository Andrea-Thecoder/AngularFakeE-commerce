import { Component, HostListener } from '@angular/core';
import { ConfigService } from './services/config.service';
import { AuthenticatorService } from './services/authenticator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 

  constructor (
    public configServices:ConfigService,
  private authServices:AuthenticatorService) {}

  ngOnInit(){
    
  }

  //Prima che il sito si chiusa effettuo la cancellazione dell'accesskey, ovvero il download
  @HostListener("window:beforeunload",['$event'])
  beforeUnload(event){
    this.authServices.logOut();
    
  }
 
}
