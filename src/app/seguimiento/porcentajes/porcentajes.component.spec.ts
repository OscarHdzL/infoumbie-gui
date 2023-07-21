import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcentajesComponent } from './porcentajes.component';

describe('PorcentajesComponent', () => {
  let component: PorcentajesComponent;
  let fixture: ComponentFixture<PorcentajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorcentajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorcentajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
