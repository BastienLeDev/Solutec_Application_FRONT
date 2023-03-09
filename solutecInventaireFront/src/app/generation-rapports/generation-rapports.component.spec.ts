import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationRapportsComponent } from './generation-rapports.component';

describe('GenerationRapportsComponent', () => {
  let component: GenerationRapportsComponent;
  let fixture: ComponentFixture<GenerationRapportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationRapportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerationRapportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
