import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupcartComponent } from './popupcart.component';

describe('PopupcartComponent', () => {
  let component: PopupcartComponent;
  let fixture: ComponentFixture<PopupcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupcartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
