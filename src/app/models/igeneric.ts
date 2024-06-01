export interface IHeroBanner {
    class:string,
    text:string,
    button:string,
    url?:string,
    params?:string;
}

export interface IUtilitiesArray {
    nome:string,
    immagine?:string,
    text?:string,
    hex?:string,
    url?:string
}

export interface ISearchParams{
    filter?: string,
    min_price?: number,
    max_price?: number,
    best_seller?: number,
    nuovo_arrivo?: boolean,
    categoria?: string[],
    colori?: string[]
}
