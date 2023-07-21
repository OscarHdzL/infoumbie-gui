import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPrimerAccesoComponent } from './control-primer-acceso.component';

describe('ControlPrimerAccesoComponent', () => {
  let component: ControlPrimerAccesoComponent;
  let fixture: ComponentFixture<ControlPrimerAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlPrimerAccesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPrimerAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
