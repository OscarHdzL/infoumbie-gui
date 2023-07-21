/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccordeonAcuerdosComponent } from './accordeon-acuerdos.component';

describe('AccordeonAcuerdosComponent', () => {
  let component: AccordeonAcuerdosComponent;
  let fixture: ComponentFixture<AccordeonAcuerdosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordeonAcuerdosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordeonAcuerdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
