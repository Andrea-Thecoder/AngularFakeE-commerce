import {Injectable } from '@angular/core';
import {fromEvent, map, startWith } from 'rxjs';

/* Questo Services è necessario per controllare se la viewport si trova in mobile o desktop. 
Grazie a ciò possiamo agire di conseguenza sulla creazione della struttura dell'html ed eventuali logiche ad essa allegate.
*/


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  isDesktop:boolean = false;

  constructor() {
    this.isDesktop = window.innerWidth > 768 ; 

    fromEvent(window,'resize').pipe(
      map(() => {
        return window.innerWidth > 768; 
      }),
      startWith(this.isDesktop)
    ).subscribe()
   }


   getResize():boolean {
    return this.isDesktop;
   }


   //#region Regex-zone 
    regexNome:RegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ]{2,}(?:\s[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:\.)?)?$/;
    regexIndirizzo:RegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ]{3,}(?:\s[a-zA-ZÀ-ÖØ-öø-ÿ]+)*(?:\s[a-zA-ZÀ-ÖØ-öø-ÿ]+,)?\s\d+(?:\s[a-zA-ZÀ-ÖØ-öø-ÿ]{1,2})?$/;
    regexEmail:RegExp = /^[a-zA-Z0-9._%+-]+(\.[a-zA-Z0-9._%+-]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    regexTelefono:RegExp = /^(?:\+?\d{1,4}\s?\d{7,10})$/;
    regexCap:RegExp = /^[0-9]{5}$/;
    regexCitta:RegExp = /^[a-zA-ZàèéìòóùÁÉÍÓÚÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇñÑ\s']+$/;
    regexProvincia:RegExp = /^[a-zA-Z]{2}$/;
    regexNazione:RegExp = /^[a-zA-Z\s]{2,50}$/;
    regexPromo:RegExp = /^[A-Za-z0-9]{4}[-\s][A-Za-z0-9]{6}[-\s][A-Za-z0-9]{4}$/;
    regexCodiceCarta:RegExp =/^\d{4}([-\s]?\d{4}){3}$/;
    regexDataScadenzaCarta:RegExp = /^(0[1-9]|1[0-2])\/(20\d{2}|[2-9]\d)$/;
    regexCvv:RegExp = /^\d{3,4}$/;
    regexPasswordCheck:RegExp =/.{8,16}/;
    regexPasswordCreate:RegExp = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~`|=-])(?=.*[A-Z])(?!.*\s).{8,16}$/;
 //#endregion Regex-zone 

}
