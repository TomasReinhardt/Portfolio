import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIcicioComponent } from './edit-icicio.component';

describe('EditIcicioComponent', () => {
  let component: EditIcicioComponent;
  let fixture: ComponentFixture<EditIcicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIcicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIcicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
