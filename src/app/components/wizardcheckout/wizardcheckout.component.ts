import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { CartService } from '../../services/cart.service';
import {IScarpeCart } from '../../models/iscarpe';
import { UtilitiesService } from '../../services/utilities.service';
import { Router } from '@angular/router';
import { IDatiCliente, IDatiOrdine } from '../../models/ipost';
import { AuthenticatorService } from '../../services/authenticator.service';

@Component({
  selector: 'app-wizardcheckout',
  templateUrl: './wizardcheckout.component.html',
  styleUrl: './wizardcheckout.component.scss'
})


export class WizardcheckoutComponent {

  constructor(
    public configServices:ConfigService,
    public utilities:UtilitiesService,
    private cartServices:CartService,
    private authServices:AuthenticatorService,
    private router:Router
    
  ){
    this.wizardForm = new FormGroup({
      nome: new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexNome)]),
      cognome: new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexNome)]),
      email: new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexEmail)]),
      telefono: new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexTelefono)]),
      indirizzo: new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexIndirizzo)]),
      cap: new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexCap)]),
      citta: new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexCitta)]),
      provincia: new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexProvincia),Validators.maxLength(2)]),
      nazione: new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexNazione)]),
      promoCodice: new FormControl("",[Validators.pattern(this.configServices.regexPromo)]),
      metodoPagamento: new FormControl("",[])
    })
  }

  wizardForm:FormGroup;
  stepView:number = 1;
  codiceOrdine:string ="";
  wizardFormView:boolean=true;
  promozioneView:boolean=false;
  mostraInfoPromo:boolean= false;
  isTimeOut:boolean=false;
  cart:IScarpeCart[]=[];
  totale:number=0;

  ngOnInit():void {
    this.cart = this.cartServices.getCart();
    this.totale = this.total();
   }


   subTotal():number{
    let total:number = 0;
    for (let element of this.cart){
      total+= (element.prezzo*element.quantita);
    }
    return total;
  }
  
  total():number {
    return this.subTotal() > 150 ?
           this.subTotal() :
           this.subTotal() == 0 ? 
           0.00 : 
           this.subTotal() + this.utilities.costoSpedizione;
  }

   apriPromozione():void{
    this.promozioneView=!this.promozioneView;
   }

   chiudiInfo():void{
      this.mostraInfoPromo=false;
   }

   mostraInfo():void{
    if(this.isTimeOut) return;
    this.mostraInfoPromo=!this.mostraInfoPromo;
    this.isTimeOut=true;
    setTimeout(() => {
      this.mostraInfoPromo=false;
      this.isTimeOut=false;
    }, 4000);
   }

   gestisciControlli():void{
    switch(this.wizardForm.get("metodoPagamento").value){
      case "Carta":
        this.wizardForm.addControl('cartaCodice', new FormControl('',[Validators.required,Validators.pattern(this.configServices.regexCodiceCarta)]));
        this.wizardForm.addControl('dataScadenza', new FormControl('',[Validators.required,Validators.pattern(this.configServices.regexDataScadenzaCarta)]));
        this.wizardForm.addControl('Cvv', new FormControl('',[Validators.required,Validators.pattern(this.configServices.regexCvv)]));
      break;
      default:
        if(this.wizardForm.contains('cartaCodice') || this.wizardForm.contains('dataScadenza') || this.wizardForm.contains('Cvv')){
          this.wizardForm.removeControl('cartaCodice');
          this.wizardForm.removeControl('dataScadenza');
          this.wizardForm.removeControl('Cvv');
        }
      break;
    }
   }

   submitWizardOne():void{
    if(this.wizardForm.invalid) return;
    this.stepView=2;
  }

   submit():void {
    if(this.wizardForm.invalid) {
      this.wizardForm.markAllAsTouched();
      return;
    }
    this.codiceOrdine=this.utilities.getCodiceOrdine(); 
    this.creaDatiOrdine();
  }

  //method di compilazione dell'oggetto da inviarae tramite Post al database per tenere traccia dell'acquisto (articoli e user).
  private creaDatiOrdine():void{
    const datiCliente:IDatiCliente = this.wizardForm.getRawValue();
    const carrelloCliente:IScarpeCart[] = this.cart;
    const pacchettoOrdine:IDatiOrdine = {
      codiceOrdine: this.codiceOrdine,
      user: datiCliente,
      articoli:carrelloCliente,
      pk_ordine: 1 //qui andrebbe una funzione di return dell'id attuale degli ordini. Non è stata possibile crfearla a livello di front-end in quanto è un dato che dovremmo recuperare dal database del sito. Inserito un valore fermaposto.
    };
    this.authServices.registerOrder(pacchettoOrdine).subscribe({
      next: success => {
        this.cartServices.emplyCart();
        switch(this.wizardForm.get('metodoPagamento').value){
          case "Paypal":
            location.href="https://www.paypal.com/signin";
          break;
          case "GPay":
            location.href="https://pay.google.com/intl/it_it/about/pay-online/";
          break;
          default:
            this.wizardFormView= false;
          break;
        }
      },
      error: error => this.router.navigateByUrl("/404")
    });
    
  }

  //#region TestZone perfavore cancella uesti comandi in fase di build!!!!!
  @HostListener("window:keyup",['$event'])
  testPleaseIgnoreValidInvalid(event:KeyboardEvent){

    if (event.key == "ì"){
      this.wizardForm.touched;
      this.wizardForm.patchValue({
        nome: "Marconi",
        cognome:"Belvedere",
        email: "marconone@gmail.com",
        telefono:"3334141321",
        indirizzo:"Viale marconi, 44",
        cap:"00151",
        citta:"Roma",
        provincia:"RM",
        nazione:"Italia",
        promoCodice:"1111-222222-1111",
        cartaCodice:"1111 2222 3333 4444",
        dataScadenza:"11/24",
        Cvv:"333"
      })
    }
  }
  //#endregion TestZone perfavore cancella uesti comandi in fase di build!!!!!


}
