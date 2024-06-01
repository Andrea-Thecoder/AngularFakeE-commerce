export interface IScarpe {

    "id":number,
    "nome":string,
    "categoria":string,
    "prezzo":number,
    "taglie_disponibili":Array<string>,
    "colori_disponibili":Array<string>,
    "descrizione":string,
    "immagine":string,
    "nuovo_arrivo":string,
    "best_seller":number
}


export interface IScarpeCart {
    "pk_scarpa":number, //puntatore all'id della scarpa, necessario in caso di bisogno di recupero di informazioni complete sappiamo a che elemento puntare.
    "id":number,
    "nome":string,
    "categoria":string,
    "prezzo":number,
    "taglia":string,
    "colore":string,
    "immagine":string,
    "quantita":number
}