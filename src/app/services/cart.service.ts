import { Injectable } from '@angular/core';
import { IScarpeCart } from '../models/iscarpe';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart:IScarpeCart[] =[]
  cartCount:BehaviorSubject<number>;
  constructor() {
    //durante la fase di inizializzazione del services il costruttore controlla se vi è un file local presente, in caso positivo ne acquisisce il suo valore. Questa operazione serve per far si che il carrello si ricarichi da dove l'utente l'aveva lasciato.
    if (localStorage.getItem("partialCart")) {
      this.cart = JSON.parse(localStorage.getItem("partialCart")!); 
    } else {
      this.cart = [];
    }
    this.cartCount = new BehaviorSubject<number>(this.cart.length);
   }

   getCartCount():Observable<number> {
    return this.cartCount.asObservable();
  }

  private updateCartCount(newCount: number): void {
    this.cartCount.next(newCount);
  }

  counterId():number{
    if (this.cart.length === 0) return 0;
    let maxId:number = 0;
    for(let element of this.cart){
      if(element.id > maxId) maxId = element.id;
    }
    return maxId;
  }

  addOnCart(prodotto:IScarpeCart):void{
    const itemFind= this.cart.find(cartItem =>{ 
            return (cartItem.nome === prodotto.nome && 
                    cartItem.colore === prodotto.colore &&
                    cartItem.taglia === prodotto.taglia)
    })
    if(itemFind) {
      itemFind.quantita += prodotto.quantita;
      if (itemFind.quantita > 10) itemFind.quantita = 10;
    }
      else this.cart.push(prodotto);
    localStorage.setItem("partialCart",JSON.stringify(this.cart));
    this.updateCartCount(this.cart.length);
  }

  getCart():IScarpeCart[]{
    this.cart = JSON.parse(localStorage.getItem("partialCart"));
    return this.cart;
  }

  deleteItem(id:number):void{
    this.cart = this.cart.filter(item => item.id != id)
    localStorage.setItem("partialCart",JSON.stringify(this.cart));
    this.updateCartCount(this.cart.length);
  }

  changeItem(id:number,quantitaChange:number):void{
    const itemFind= this.cart.find(cartItem => cartItem.id === id);
    itemFind.quantita = quantitaChange;
    localStorage.setItem("partialCart",JSON.stringify(this.cart));
  }

  emplyCart():void{
    this.cart = []; 
    localStorage.setItem("partialCart",JSON.stringify(this.cart));
    this.updateCartCount(this.cart.length);

  }

  

   /*  consoleCart():void{
    console.log(this.cart)
   } */
}
