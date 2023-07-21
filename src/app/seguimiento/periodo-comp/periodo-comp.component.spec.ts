import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoCompComponent } from './periodo-comp.component';

describe('PeriodoCompComponent', () => {
  let component: PeriodoCompComponent;
  let fixture: ComponentFixture<PeriodoCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodoCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodoCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
