import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAlertaComponent } from './agregar-alerta.component';

describe('AgregarAlertaComponent', () => {
  let component: AgregarAlertaComponent;
  let fixture: ComponentFixture<AgregarAlertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAlertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
