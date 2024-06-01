import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { IScarpeCart } from '../../models/iscarpe';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-popupcart',
  templateUrl: './popupcart.component.html',
  styleUrl: './popupcart.component.scss'
})
export class PopupcartComponent {
  constructor(
    private elementRef:ElementRef,
    public resize:ConfigService
    ){}

  @Input() product:IScarpeCart
  @Output() openCartEmitter= new EventEmitter<boolean>()
  
  @HostListener("click",["$event"]) onclick(event:MouseEvent) {
    if (event.target === this.elementRef.nativeElement)
    this.returnDetail()
  }

  fade:boolean = false
  ngOnInit(){
    console.log(this.product)
    setTimeout(() => {
      this.returnDetail()
    }, 5000);
  }

  returnDetail(){
    this.fade=true
    setTimeout(() => {
      this.openCartEmitter.emit(false)
    }, 700);
  }
}
