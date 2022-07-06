import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditwebsComponent } from './editwebs.component';

describe('EditwebsComponent', () => {
  let component: EditwebsComponent;
  let fixture: ComponentFixture<EditwebsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditwebsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditwebsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
