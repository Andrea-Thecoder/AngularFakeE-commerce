import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrl: './errorpage.component.scss'
})
export class ErrorpageComponent {

  constructor(private router:Router){}

  ngOnInit():void {
    setTimeout(() => {
      this.router.navigateByUrl("/Home");
    }, 8000);
  }
}
