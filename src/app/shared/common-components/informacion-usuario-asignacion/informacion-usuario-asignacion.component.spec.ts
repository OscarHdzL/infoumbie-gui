import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionUsuarioAsignacionComponent } from './informacion-usuario-asignacion.component';

describe('InformacionUsuarioAsignacionComponent', () => {
  let component: InformacionUsuarioAsignacionComponent;
  let fixture: ComponentFixture<InformacionUsuarioAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionUsuarioAsignacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionUsuarioAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
