import { Options } from '@angular-slider/ngx-slider';
import { Component, HostListener } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { ConfigService } from '../../services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ScarpeService } from '../../services/scarpe.service';
import { IScarpe } from '../../models/iscarpe';
import { Subscription} from 'rxjs';
import { ISearchParams } from '../../models/igeneric';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {


  constructor(
    public utilities:UtilitiesService,
    public configServices:ConfigService,
    private route:ActivatedRoute,
    private scarpeService:ScarpeService,
    private router:Router,
    private activatedRouter:ActivatedRoute
  ){}

  //#region input zone 
  minPrice:number =0;
  maxPrice:number=999;
  sliderOptions:Options = {
    floor: 0, //valore di partenza, il min
    ceil: 999, //valore massimo, il max
    step: 1, //di quanto i lvalore cambia per ogni step
    showTicks: false, //mostra il tick di passaggio del valore
    tickStep: 10, //quanto si muove per ogni tick
    hidePointerLabels: true, //necessario per oscurare i valori sopra i pointer
    hideLimitLabels: true //necessario per oscurare i valori ai limiti
  }
  ratingValue:number=1;
  minRating:number=1;
  maxRating:number=5;
  ratingOptions:Options = {
    floor: this.minRating, 
    ceil: this.maxRating,
    step: 1, 
    showTicks: false,
    tickStep: 1,
    hidePointerLabels: false,
    hideLimitLabels: false
  }
  searchedCat:string[]=[];
  searchedColor:string[]=[];
  news:boolean=false;

  //#endregion inputRange zone 

  mobileView:boolean=false;
  scarpe:IScarpe[]=[];
  scarpeTotali:IScarpe[]= [];
  elementiVisualizzabili:number = 20;
  isContinueElement:boolean = true;

  sub:Subscription;
  subRoute:Subscription;

  mainTitle:string = "Tutti i prodotti:";
  
  ngOnInit():void{
    this.mobileView = this.configServices.getResize();
    this.searchControlStarter();
  }

  ngOnDestroy():void {
    this.sub.unsubscribe();
    this.subRoute.unsubscribe();
  }

  continueView():void{
    this.elementiVisualizzabili += 10;
    this.scarpe=this.scarpeTotali.slice(0,this.elementiVisualizzabili);
    if (this.elementiVisualizzabili >= this.scarpeTotali.length) this.isContinueElement= false;
  }

  CatSelet(value:string):void {
    this.searchedCat.includes(value) ?
      this.searchedCat = this.searchedCat.filter (element => element !== value) :
      this.searchedCat.push(value);
      
  }

  ColorSelet(value:string):void {
    this.searchedColor.includes(value) ?
      this.searchedColor = this.searchedColor.filter (element => element !== value) :
      this.searchedColor.push(value);
  }

  openFilter():void{
    this.mobileView=!this.mobileView;
  }

  submit():void{
      const params={
      min_price: this.minPrice,
      max_price: this.maxPrice,
      best_seller: this.ratingValue,
      nuovo_arrivo: this.news
    }
    this.searchedCat.length > 0 ? 
      params['categoria'] = this.searchedCat : delete params['categoria'];
    this.searchedColor.length > 0 ?
      params['colori'] = this.searchedColor :  delete params['colori'];
    if(!this.configServices.getResize()) this.mobileView= false;
    this.router.navigate(['/Prodotti',params])
  }
  
  reset():void{
    this.minPrice=0;
    this.maxPrice=999;
    this.ratingValue=1;
    this.searchedCat.length=0;
    this.searchedColor.length=0;
    this.news=false;
  }

  private searchControlStarter():void{
    this.subRoute= this.route.params.subscribe({
      next: params => {
        Object.keys(params).length === 0 ?
          this.initAllProduct():
          Object.keys(params).length === 1 ?
            this.searched1param(params,this.activatedRouter.snapshot.url[1]?.path) :
            this.searchedProduct(params);
      },
      error: error =>{this.router.navigate(['/404']);} 
    });
  }

  private initAllProduct():void{
    this.sub = this.scarpeService.getScarpe().subscribe({
      next: data =>{
        this.scarpeTotali=data;
        this.scarpe = this.scarpeTotali.slice(0, this.elementiVisualizzabili);
      },
      error: error =>{this.router.navigate(['/404']);} 
    })
  }

  private searchedProduct(params:ISearchParams):void{
  this.sub = this.scarpeService.getScarpeFilter(params).subscribe({
      next: data => {
        this.scarpeTotali = data;
        this.scarpe = this.scarpeTotali.slice(0, this.elementiVisualizzabili);
        if (this.scarpeTotali.length <= 20) 
          this.isContinueElement= false;
          else this.isContinueElement= true;
        this.mainTitle="Prodotti ricercati:"
      },
      error: error =>{this.router.navigate(['/404']);} 
    })
  }

  private searched1param(param:object,filter:string):void {
    /* console.log(typeof param[Object.keys(param)[0]],param[Object.keys(param)[0]],Object.keys(param)[0],filter) */
    switch(filter){
      case 'Best_seller':
        this.sub = this.scarpeService.getScarpeBest(parseInt(param[Object.keys(param)[0]])).subscribe({
          next: data => {
            this.scarpeTotali = data;
            this.scarpe = this.scarpeTotali.slice(0, this.elementiVisualizzabili);
            if (this.scarpeTotali.length <= 20) 
              this.isContinueElement= false;
              else this.isContinueElement= true;
            this.mainTitle="Prodotti ricercati:"
          },
          error: error =>{this.router.navigate(['/404']);} 
        })
      break;
      case"Nome":
      this.sub = this.scarpeService.getScarpebyNome(param['filter']).subscribe({
        next: data => {
          this.scarpeTotali = data;
          this.scarpe = this.scarpeTotali.slice(0, this.elementiVisualizzabili);
          if (this.scarpeTotali.length <= 20) 
            this.isContinueElement= false;
            else this.isContinueElement= true;
          this.mainTitle="Prodotti ricercati:"
        },
        error: error =>{this.router.navigate(['/404']);} 
      });
      break;
      case "Nuovo_arrivo":
        this.sub = this.scarpeService.getScarpebyCat(param[Object.keys(param)[0]],filter).subscribe({
          next: data => {
            this.scarpeTotali = data;
            this.scarpe = this.scarpeTotali.slice(0, this.elementiVisualizzabili);
            if (this.scarpeTotali.length <= 20) 
              this.isContinueElement= false;
              else this.isContinueElement= true;
            this.mainTitle="Prodotti ricercati:"
          },
          error: error =>{this.router.navigate(['/404']);} 
        })
      break;
      default:
        this.sub = this.scarpeService.getScarpebyCat(param['filter'],'categoria').subscribe({
          next: data => {
            this.scarpeTotali = data;
            this.scarpe = this.scarpeTotali.slice(0, this.elementiVisualizzabili);
            if (this.scarpeTotali.length <= 20) 
              this.isContinueElement= false;
              else this.isContinueElement= true;
            this.mainTitle="Prodotti ricercati:"
          },
          error: error =>{this.router.navigate(['/404']);} 
        });
      break;
    }
  }

} 