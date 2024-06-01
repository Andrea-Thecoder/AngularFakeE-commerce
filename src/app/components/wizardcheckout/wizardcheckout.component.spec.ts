import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardcheckoutComponent } from './wizardcheckout.component';

describe('WizardcheckoutComponent', () => {
  let component: WizardcheckoutComponent;
  let fixture: ComponentFixture<WizardcheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WizardcheckoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WizardcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
