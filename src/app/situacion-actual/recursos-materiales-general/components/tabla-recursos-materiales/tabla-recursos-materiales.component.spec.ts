import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRecursosMaterialesComponent } from './tabla-recursos-materiales.component';

describe('TablaRecursosMaterialesComponent', () => {
  let component: TablaRecursosMaterialesComponent;
  let fixture: ComponentFixture<TablaRecursosMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaRecursosMaterialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRecursosMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
