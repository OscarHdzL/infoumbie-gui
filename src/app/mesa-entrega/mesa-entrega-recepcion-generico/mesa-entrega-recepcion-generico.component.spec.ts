/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MesaEntregaRecepcionGenericoComponent } from './mesa-entrega-recepcion-generico.component';

describe('MesaEntregaRecepcionGenericoComponent', () => {
  let component: MesaEntregaRecepcionGenericoComponent;
  let fixture: ComponentFixture<MesaEntregaRecepcionGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesaEntregaRecepcionGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesaEntregaRecepcionGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
