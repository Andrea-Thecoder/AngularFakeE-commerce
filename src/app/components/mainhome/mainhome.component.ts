import { Component, ElementRef, ViewChild} from '@angular/core';
import { ScarpeService } from '../../services/scarpe.service';
import { IScarpe } from '../../models/iscarpe';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import {IHeroBanner } from '../../models/igeneric';
import { UtilitiesService } from '../../services/utilities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.component.html',
  styleUrl: './mainhome.component.scss'
})
export class MainhomeComponent {
  constructor (
    private serviceScarpe:ScarpeService,
    public configServices:ConfigService,
    public utilities:UtilitiesService,
    private router: Router
    ) {}
  
  
  //#region propriety for HeroBanner 
  private heroBannerSlogan:Array<IHeroBanner> = [
    {class:"bg-banner1", text: "Sono arrivate le Nike Air, provale ora!", button:"Scopri le Nike Air",url:"/Prodotti/Nome", params:"Nike Air"},
    {class:"bg-banner2", text: "Scopri i grandi stivaletti sportivi LabAir", button:"Scopri le LabAir Boots",url:"/Prodotti", params:"Running"},
    {class:"bg-banner3", text: "Scarpe per tutti! Scopri la nuova gamma", button:"Vai a Tutti i Prodotti",url:"/Prodotti", params:""},
  ];
  heroBanner:number = 0;
  bgHeroBanner:string = this.heroBannerSlogan[this.heroBanner].class;
  heroBannerText:string =this.heroBannerSlogan[this.heroBanner].text;
  heroBannerButtonText:string =this.heroBannerSlogan[this.heroBanner].button;
  heroBannerUrl:string =this.heroBannerSlogan[this.heroBanner].url;
  heroBannerParams:string = this.heroBannerSlogan[this.heroBanner].params;
  HeroBannerStartStop:any;
  //#endregion propriety for HeroBanner 

  ScarpeBest4:IScarpe[];

  stars:Array<boolean> = [];

  //#region ArrowButton zone
  scrollStep:number = 350
  @ViewChild('BestSellerSlider') bestSellerSlider: ElementRef ;
  @ViewChild('SportSlider') sportSlider:ElementRef;
  @ViewChild('MemberSlider') memberSlider:ElementRef;
  //#endregion ArrowButton zone


  //#region subscription zone
  scarpeSub:Subscription;
  //#endregion subscription zone



  ngOnInit(){
    this.stars.length=5;
    this.heroBannerSlide();
    this.scarpeSub = this.serviceScarpe.getScarpeBest(4).subscribe({
      next: data => {
        this.ScarpeBest4 = data;
        this.ScarpeBest4.length=12; //Inserimento limite di visualizzazione in anteprima.
        },
        error: error =>{this.router.navigate(['/404']);} 
    });
  }

  ngOnDestroy(){
    this.scarpeSub.unsubscribe();
  }


  ScrollLeftRight(scroll:ElementRef,position:string):void{
    const scrolling = scroll.nativeElement as HTMLElement;
    switch(position){
      case "left":
        scrolling.scrollLeft -= this.scrollStep;
      break;
      case "right":
        scrolling.scrollLeft += this.scrollStep;
      break;
    }
    
  }


  //#region Herobanner Slider
  HeroBannerEnter():void {
    clearInterval(this.HeroBannerStartStop);
  }

  HeroBannerLeave():void {
    this.heroBannerSlide();
  }

  private heroBannerSlide():void{
    this.HeroBannerStartStop = setInterval(() => {
      this.heroBanner++
      if(this.heroBanner > 2) this.heroBanner=0
      this.bgHeroBanner = this.heroBannerSlogan[this.heroBanner].class;
      this.heroBannerText=this.heroBannerSlogan[this.heroBanner].text;
      this.heroBannerButtonText=this.heroBannerSlogan[this.heroBanner].button;
      this.heroBannerUrl=this.heroBannerSlogan[this.heroBanner].url;
      this.heroBannerParams= this.heroBannerSlogan[this.heroBanner].params;
      

    },5000)
  }
    //#endregion Herobanner Slider
}
