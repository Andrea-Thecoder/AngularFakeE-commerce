import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IScarpeCart } from '../../models/iscarpe';
import { ConfigService } from '../../services/config.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-checkoutcart',
  templateUrl: './checkoutcart.component.html',
  styleUrl: './checkoutcart.component.scss'
})
export class CheckoutcartComponent {
  constructor(
    private cartServices:CartService,
    public configServices:ConfigService,
    private utilities:UtilitiesService
  ) {}

  cart:IScarpeCart[]=[];
  option:Array<number>= Array(10);
  selectOption:string[]= [];
  buttonEnable:boolean = false;

  ngOnInit():void{
    this.buttonEnable= false;
    this.cart = this.cartServices.getCart();
    this.selectStartingValue();
  }


  subTotal():number{
    let total:number = 0;
    for (let element of this.cart){
      total+= (element.prezzo*element.quantita);
    }
    return total;
  }
  
  total():number {
    if (this.subTotal() == 0) this.buttonEnable=true;
    return this.subTotal() > 150 ?
           this.subTotal() :
           this.subTotal() == 0 ? 
           0.00 : 
           this.subTotal() + this.utilities.costoSpedizione;
  }

  deleteItem(id:number):void {
    this.cart = this.cart.filter(item => item.id != id);
    this.cartServices.deleteItem(id);
    
  }

  selectStartingValue():void{
    this.cart.forEach((item, index) => {
      this.selectOption[index] = item.quantita.toString();
    })
  }
  
  onChangeSelect(i:number):void{
    this.cart[i].quantita = parseInt(this.selectOption[i]);
    this.cartServices.changeItem(this.cart[i].id,parseInt(this.selectOption[i]));
  }


}
