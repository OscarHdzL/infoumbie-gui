/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalVerComentarioCancelacionComponent } from './modal-ver-comentario-cancelacion.component';

describe('ModalVerComentarioCancelacionComponent', () => {
  let component: ModalVerComentarioCancelacionComponent;
  let fixture: ComponentFixture<ModalVerComentarioCancelacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVerComentarioCancelacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerComentarioCancelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
