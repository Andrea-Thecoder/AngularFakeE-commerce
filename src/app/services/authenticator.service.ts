import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IAccesso, IDatiOrdine, IRegister } from '../models/ipost';
import { JwtConfig } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  constructor(
    private http:HttpClient
  ) { }
  register(user:IRegister):Observable<any>{
    return this.http.post(environment.baseUrlRegister,user);
  }

  

  login(user:IAccesso):Observable<any>{
    return this.http.post(environment.baseUrlLogin,user).pipe(
      tap (risposta => 
        localStorage.setItem('accessKey',risposta.accessToken)
      )
    )
  }

  logOut(){
    localStorage.removeItem('accessKey');
  }

  //Qui andrebbe un interfadce IDatiCliente, interface che attualmente non ho messo in quanto la pagina di gestione account non è completata. Non ssendo completata, questa  interface andrebbe in conflitto con il method col risultato che non potrei far vedere l'avvenuto accesso. 
  getUserProfile(id:string):Observable<any>{
    const accessToken= localStorage.getItem("accessKey");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    const params = new HttpParams().set('id',id);
    return this.http.get<any>(environment.baseUrlAccess, { headers , params });
  }

  registerOrder(ordine:IDatiOrdine):Observable<any>{
    return this.http.post(environment.baseUrlOrdine,ordine);
  }

  public get UserId():string{
    return JSON.parse(atob(localStorage.getItem("accessKey").split(".")[1])).sub;
  }

  public get loggedIn():boolean{
    return localStorage.getItem('accessKey') !== null;
  }
}
