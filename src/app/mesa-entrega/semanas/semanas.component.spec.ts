/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SemanasComponent } from './semanas.component';

describe('SemanasComponent', () => {
  let component: SemanasComponent;
  let fixture: ComponentFixture<SemanasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
