import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ScarpeService } from '../../services/scarpe.service';
import { IScarpe, IScarpeCart } from '../../models/iscarpe';
import { UtilitiesService } from '../../services/utilities.service';
import { IUtilitiesArray } from '../../models/igeneric';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

  constructor (
    private route:ActivatedRoute,
    private scarpeService:ScarpeService,
    private utilities:UtilitiesService,
    private cartService:CartService,
    private router:Router
    
  ) {
    this.buyForm = new FormGroup({
      quantita: new FormControl(1,[Validators.required,Validators.max(10),Validators.min(1)]),
      colore: new FormControl(null,[Validators.required]),
      taglia: new FormControl(null,[Validators.required])
    })
  }

  scarpa:IScarpe;
  prodotto:IScarpeCart;

  //#region Form zone 
  buyForm: FormGroup;
  quantitaValue:Array<number>= new Array(10).fill(0).map((item,index)=> index + 1);
  colorInvalid:boolean = false;
  tagInvalid:boolean = false;
  //#endregion Form zone 

  sub:Subscription;
  subRoute:Subscription;

  openPopUp:boolean = false;

  ngOnInit():void{
    this.callScarpa();
    this.cartService.getCart();
    
  }

  ngOnDestroy():void{
    this.sub.unsubscribe();
    this.subRoute.unsubscribe();
  }


  controllaQuantita(){
    if(this.buyForm.get('quantita').value > 10) this.buyForm.get('quantita').setValue(10);
    if(this.buyForm.get('quantita').value < 1) this.buyForm.get('quantita').setValue(1);
  }

  submit():void{
    this.colorInvalid=false;
    this.tagInvalid=false; //Resetto i valori per disabilitare eventuali campi che sono stati validati dopo il primo controllo di invalidazione.
    if (this.buyForm.invalid) {
      if(this.buyForm.get('colore').value == null ) this.colorInvalid=true;
      if(this.buyForm.get('taglia').value == null ) this.tagInvalid=true;
      return;
    }
    let newToken:IScarpeCart = {
      pk_scarpa: this.scarpa[0].id,
      id : this.createID(),
      nome: this.scarpa[0].nome,
      categoria: this.scarpa[0].categoria,
      immagine: this.scarpa[0].immagine,
      prezzo: this.scarpa[0].prezzo,
      taglia: this.buyForm.get('taglia').value,
      colore: this.buyForm.get('colore').value,
      quantita: this.buyForm.get('quantita').value
    }
    this.cartService.addOnCart(newToken);
    this.prodotto=newToken;
    this.openPopUp=true;
    this.buyForm.get('quantita').setValue(1)
  }

  changeOpenCart(event:boolean){
    this.openPopUp=event
  }


  //#region method per il funzionmento della form
  coloriScarpe():IUtilitiesArray[]{
    let coloriDisponibili:IUtilitiesArray[]=[];
    this.utilities.arrayColori.forEach(item => {
      this.scarpa[0].colori_disponibili.forEach(colore => {
        if(item.nome === colore) coloriDisponibili.push(item);
      })
     })
    return coloriDisponibili;
  }

  selectColore(colore:string):void{
    this.buyForm.get("colore").setValue(colore);
  }

  selectTaglia(taglia:string):void {
    this.buyForm.get("taglia").setValue(taglia);
  }

  decremento():void{
    const quantita:number = this.buyForm.get("quantita").value;
    if(quantita <= 1) return;
    this.buyForm.get("quantita").setValue(quantita - 1)
  }

  incremento():void{
    const quantita:number = this.buyForm.get("quantita").value;
    if(quantita >= 10) return;
    this.buyForm.get("quantita").setValue(quantita + 1)
  }

  //#endregion method per il funzionmento della form

  private callScarpa():void {
    this.subRoute= this.route.params.subscribe({
      next: param => {
        this.sub= this.scarpeService.getScarpebyId(param['id']).subscribe({
          next: data => {
            this.scarpa=data;
          },
          error: error =>{this.router.navigate(['/404']);} 
        });
      },
      error: error =>{this.router.navigate(['/404']);} 
    })
  }

  private createID():number{
    return this.cartService.counterId() + 1;
  }
}
