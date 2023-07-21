import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesPorConfirmarComponent } from './unidades-por-confirmar.component';

describe('UnidadesPorConfirmarComponent', () => {
  let component: UnidadesPorConfirmarComponent;
  let fixture: ComponentFixture<UnidadesPorConfirmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadesPorConfirmarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesPorConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
