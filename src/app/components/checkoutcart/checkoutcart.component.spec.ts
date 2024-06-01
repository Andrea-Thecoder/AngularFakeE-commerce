import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutcartComponent } from './checkoutcart.component';

describe('CheckoutcartComponent', () => {
  let component: CheckoutcartComponent;
  let fixture: ComponentFixture<CheckoutcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutcartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
