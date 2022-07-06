import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclientsComponent } from './editclients.component';

describe('EditclientsComponent', () => {
  let component: EditclientsComponent;
  let fixture: ComponentFixture<EditclientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditclientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
