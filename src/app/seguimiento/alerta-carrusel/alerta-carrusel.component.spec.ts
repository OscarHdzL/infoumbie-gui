import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaCarruselComponent } from './alerta-carrusel.component';

describe('AlertaCarruselComponent', () => {
  let component: AlertaCarruselComponent;
  let fixture: ComponentFixture<AlertaCarruselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertaCarruselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
