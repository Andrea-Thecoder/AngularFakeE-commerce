import { Pipe, PipeTransform } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';

@Pipe({
  name: 'valuecheck'
})
export class ValuecheckPipe implements PipeTransform {

  constructor(
    private utilities:UtilitiesService
  ){

  }
  transform(shipCost:number):string {
   return shipCost > 150 ?
          "Gratuita" :
          shipCost == 0 ?
          '0,00 €' :
          `${this.utilities.costoSpedizione.toFixed(2)} €`
  }

}
