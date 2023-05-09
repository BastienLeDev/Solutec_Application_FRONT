import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSuppressionTypeProductComponent } from './confirm-suppression-type-product.component';

describe('ConfirmSuppressionTypeProductComponent', () => {
  let component: ConfirmSuppressionTypeProductComponent;
  let fixture: ComponentFixture<ConfirmSuppressionTypeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmSuppressionTypeProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmSuppressionTypeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
