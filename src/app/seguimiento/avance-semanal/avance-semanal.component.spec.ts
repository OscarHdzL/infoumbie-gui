import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceSemanalComponent } from './avance-semanal.component';

describe('AvanceSemanalComponent', () => {
  let component: AvanceSemanalComponent;
  let fixture: ComponentFixture<AvanceSemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvanceSemanalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvanceSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
