import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRecursosMaterialesDetalleComponent } from './tabla-recursos-materiales-detalle.component';

describe('TablaRecursosMaterialesDetalleComponent', () => {
  let component: TablaRecursosMaterialesDetalleComponent;
  let fixture: ComponentFixture<TablaRecursosMaterialesDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaRecursosMaterialesDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRecursosMaterialesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
