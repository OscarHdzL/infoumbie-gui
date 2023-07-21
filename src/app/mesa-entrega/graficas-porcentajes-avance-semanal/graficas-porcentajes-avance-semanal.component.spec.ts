/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GraficasPorcentajesAvanceSemanalComponent } from './graficas-porcentajes-avance-semanal.component';

describe('GraficasPorcentajesAvanceSemanalComponent', () => {
  let component: GraficasPorcentajesAvanceSemanalComponent;
  let fixture: ComponentFixture<GraficasPorcentajesAvanceSemanalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficasPorcentajesAvanceSemanalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasPorcentajesAvanceSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
