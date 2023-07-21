import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosMaterialesGeneralComponent } from './recursos-materiales-general.component';

describe('RecursosMaterialesGeneralComponent', () => {
  let component: RecursosMaterialesGeneralComponent;
  let fixture: ComponentFixture<RecursosMaterialesGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosMaterialesGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosMaterialesGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
