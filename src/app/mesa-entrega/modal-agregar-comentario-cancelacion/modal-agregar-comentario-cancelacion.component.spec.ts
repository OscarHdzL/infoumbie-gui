/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalAgregarComentarioCancelacionComponent } from './modal-agregar-comentario-cancelacion.component';

describe('ModalAgregarComentarioCancelacionComponent', () => {
  let component: ModalAgregarComentarioCancelacionComponent;
  let fixture: ComponentFixture<ModalAgregarComentarioCancelacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarComentarioCancelacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarComentarioCancelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
