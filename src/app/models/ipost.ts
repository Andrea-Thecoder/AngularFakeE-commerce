import { IScarpeCart } from "./iscarpe";

export interface IDatiCliente{
    nome: string,
    cognome:string,
    email:string,
    telefono:string,
    indirizzo:string,
    cap:string;
    citta:string,
    provincia:string,
    nazione:string,
    cartaCodice?:string,
    dataScadenza?:string,
    Cvv?:string,
    promoCodice?:string,
    metodoPagamento?:string, //voce per database, utilizzo per fini statistici.
    id?:number // nota questo campo dovrebbe essere obbligatorio. è stato flaggato TEMPORANEAMENTE come opzionale solo per puri scopi di testyer. Una volta configurato correttamente la pagina Account bisogna riconsiderare questo campo come obbligatorio.
}

export interface IDatiOrdine{
    user:IDatiCliente,
    articoli:IScarpeCart[],
    codiceOrdine:string,
    pk_ordine:number  //campo usato per i database per collegare l'ordine al cliente 
}

export interface IAccesso{
    email:string,
    password:string,
    rememberMe?:boolean
}

export interface IRegister{
    nome:string,
    cognome:string,
    email:string,
    password:string,
    privacyCheck:boolean
}
