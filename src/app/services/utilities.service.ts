import { Injectable } from '@angular/core';
import { IUtilitiesArray } from '../models/igeneric';
import { formatDate } from '@angular/common';

/* Sercices dedicato all'immagazzinamento dei dati di utlità (es. il link del logo, i vari dati per i banner etc). */


@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() {
  }

   logourl:string ="../../../assets/images/logo.png";

   costoSpedizione:number = 10;
   
   arrayCategoria:IUtilitiesArray[] = [
    {nome:'Basket', immagine:'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
    {nome:'Sneakers',immagine:'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
    {nome:'Running',immagine:'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
    {nome:'Training',immagine:'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
    {nome:'Trail Running',immagine:'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
   ];
   arrayMember:IUtilitiesArray[]= [
    {nome:'Unisciti', text:'Unisciti a milioni di clienti in tutto il mondo grazie a MemberShip.', url:'/Register', immagine:'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
    {nome:'Abbonati', text:'Scegli il piano tariffario che fa per te: 1,3,6 mesi di MemberShip e goditi i vantaggi!', url:'/Login', immagine:'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
    {nome:'Vantaggi', text:'Una valanga di ricompense ti attendono con MemberShip!', url:'/',immagine:'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
    {nome:'Scopri', text:'Scopri le nuove tendenze e ascolta i consigli della community grazie a MemberShip', url:'/', immagine:'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
   ];

   arrayColori:IUtilitiesArray[]=[
    {nome: "Nero", hex: "#000000"},
    {nome: "Bianco", hex: "#FFFFFF"},
    {nome: "Grigio", hex: "#808080"},
    {nome: "Blu", hex: "#0000FF"},
    {nome: "Rosso", hex: "#FF0000"},
    {nome: "Nero/Giallo", hex: "linear-gradient(to right, #000000, #FFFF00)"},
    {nome: "Grigio/Blu", hex: "linear-gradient(to right, #808080, #0000FF)"},
    {nome: "Bianco/Rosso", hex: "linear-gradient(to right, #FFFFFF, #FF0000)"},
    {nome: "Verde", hex: "#008000"},
    {nome: "Grigio/Arancione", hex: "linear-gradient(to right, #808080, #FFA500)"},
    {nome: "Bianco/Nero", hex: "linear-gradient(to right, #FFFFFF, #000000)" },
    {nome: "Blu/Verde", hex: "linear-gradient(to right, #0000FF, #008000)" },
    {nome: "Nero/Rosso", hex: "linear-gradient(to right, #000000, #FF0000)" },
    {nome: "Blu/Rosso", hex: "linear-gradient(to right, #0000FF, #FF0000)" },
    {nome: "Rosso/Bianco", hex: "linear-gradient(to right, #FF0000, #FFFFFF)" },
    {nome: "Nero/Grigio", hex: "linear-gradient(to right, #000000, #808080)" },
    {nome: "Argento", hex: "#C0C0C0"},
    {nome: "Oro", hex: "#FFD700"},
    {nome: "Arancione", hex: "#FFA500"},
    {nome: "Nero/Bianco", hex: "linear-gradient(to right, #000000, #FFFFFF)" },
    {nome: "Rosso/Nero", hex: "linear-gradient(to right, #FF0000, #000000)" }
  ];


  preventDefaultEvent(e:Event){
    e.preventDefault();
  }


  getDate():string{
    return formatDate(new Date(),"dd/MM/yyyy",'it-IT');
  }

  getShippingDate():string{
    return formatDate(new Date().setDate(new Date().getDate()+5),"dd/MM/yyyy",'it-IT');
  }

  getCodiceOrdine():string {
    const charUno:string = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    const charDue:string = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    const charTre:string = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    return `${charUno}${Math.floor(Math.random()*30)}${charDue}${Math.floor(Math.random()*60)}${charTre}${Math.floor(Math.random()*120)}`;
  }

}
