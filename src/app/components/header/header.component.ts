import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { UtilitiesService } from '../../services/utilities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  search = new FormControl("",Validators.required)
  
  constructor(
    public configServices:ConfigService,
    public utilities:UtilitiesService,
    private router:Router,
    private cartServices:CartService
  ) {}
  menuActive:boolean = false;
  viewportWidth:number= 0;
  slider:number=0;
  IntervalBlock:any = "";
  menuSwitch:number = 0;
  openSearch:boolean = false;
  isTimeOut:boolean=false;
  timeClear:any;
  itemCount:number = 1;

  ngOnInit():void{
    this.menuActive= this.configServices.getResize();
    this.SliderEvent();
    this.cartServices.getCartCount().subscribe({
      next: data => this.itemCount=data
    })

  }


  stopClearTime():void{
    clearTimeout(this.timeClear);
    this.isTimeOut=false;
  }

  startClearTime():void{
    this.isTimeOut=true;
    this.timeClear= setTimeout(() => {
      this.isTimeOut=false;
      this.menuSwitch=0;
      }, 2000);

  }

  apriMenu(id:number):void{
    //inviamo args -1 quando abbiamo bisogno che il menu non solo venga chiuso, ma che venga anche disabilitata la sua visione in mobile mode. Mentre inviamo un args 0 quando abbiamo solo bisogno di tornare al menu di liv 1. Nota questa meccanica è importante solo per il mobile view, nel desktop view è indifferente che noi inviamo un -1 o 0 in quanto qualsiasi valore differente dall'assegnato al menu liv 2 poterà il ritorno al menu liv 1 che è orizzontale, e quindi sempre attivo.
    if(id==-1 && !this.configServices.getResize()) this.menuActive=false;
    this.menuSwitch=id;
    if(id == 0) {
      clearTimeout(this.timeClear);
      this.isTimeOut=false;
    }
    else if(id != 0 && !this.isTimeOut){
      this.isTimeOut=true;
      this.timeClear= setTimeout(() => {
      this.isTimeOut=false;
      this.menuSwitch=0;
      }, 2000);
    }
  }

  apriMainMenu():void{
    this.menuActive= !this.menuActive
  }

  
  SliderEventEnter():void {
    clearInterval(this.IntervalBlock);
  }

  SliderEventLeave():void{
    this.SliderEvent();
  }

  toggleSearchBar():void{
    this.openSearch=!this.openSearch;
  }

  private SliderEvent():void{
    this.IntervalBlock = setInterval(()=> {
      this.slider++;
      if (this.slider == 4) this.slider = 0 
    }, 5000)
  }

  submit():void{
    if(!this.search.valid || this.search.value.length < 3) return;
    this.openSearch=false;
    this.router.navigate(['/Prodotti/Nome',this.search.value]);
   }

}
