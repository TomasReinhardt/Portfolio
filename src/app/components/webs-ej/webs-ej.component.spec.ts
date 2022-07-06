import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsEjComponent } from './webs-ej.component';

describe('WebsEjComponent', () => {
  let component: WebsEjComponent;
  let fixture: ComponentFixture<WebsEjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsEjComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsEjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
