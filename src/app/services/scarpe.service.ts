import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IScarpe } from '../models/iscarpe';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

/* Sercices fondamentale per fare le request get e ricevere i dati dal nostro server (in questo caso json server). Gestisce e filtra i dati dei prodotti delle scarpe */

@Injectable({
  providedIn: 'root'
})
export class ScarpeService {

  constructor(
    private http:HttpClient) { }


  
  getScarpe():Observable<IScarpe[]>{
    return this.http.get<IScarpe[]>(environment.baseUrlService);
  }

  getScarpebyCat(param:string,filter:string):Observable<IScarpe[]>{
    const params = new HttpParams().set(filter.toLowerCase(),param);
    console.log(params)
    return this.http.get<IScarpe[]>(environment.baseUrlService,{params})
  }

  getScarpebyNome(param:string):Observable<IScarpe[]>{
    return this.http.get<IScarpe[]>(environment.baseUrlService).pipe(
      map((data: IScarpe[]) => data.filter(item =>
        item.nome.toLowerCase().includes(param.toLowerCase())
      ))
    )
  }

  getScarpeBest(rating:number):Observable<IScarpe[]>{
    return this.http.get<IScarpe[]>(environment.baseUrlService).pipe(
      map((data: IScarpe[]) => data.filter(item => item.best_seller >= rating))
    )
  }

  getScarpebyId(id:number):Observable<IScarpe>{
    const params = new HttpParams().set('id',id)
    return this.http.get<IScarpe>(environment.baseUrlService,{params})
  }
  

  getScarpeFilter(params):Observable<IScarpe[]>{
    return this.http.get<IScarpe[]>(environment.baseUrlService).pipe(
      map((data: IScarpe[]) => 
        data
          .filter(item => {
          return (
          item.best_seller >= parseInt(params.best_seller) &&
          item.prezzo >= parseInt(params.min_price) && 
          item.prezzo <= parseInt(params.max_price)
          )
        })
          .filter( item => {
          return params.nuovo_arrivo == true || params.nuovo_arrivo =="true" ? item.nuovo_arrivo == "true" : true}
        )
          .filter (item => {
          if ("categoria" in params){ 
            return params.categoria.includes(item.categoria)}
            else return true;
        })
          .filter (item => {
          if ("colori" in params){ 
            let validator:boolean = false;
            const colore:Array<string>= params.colori.split(",")
            for (let colori of item.colori_disponibili){
              if (colore.includes(colori)){ 
                  validator = true;
                  break; 
                }
            }
            return validator;
          }
            else return true;
        })
      ))
  }


 /*  private testPleaseIgnore(){
    return this.http.get<IScarpe[]>(environment.baseUrlService).pipe(
      map((data: IScarpe[]) => data.filter(item => item.colori_disponibili).map(item => item.colori_disponibili)
    ))
  }  method utilizzato in fase di progettazione per cataòpgare o cpòpro */

}
