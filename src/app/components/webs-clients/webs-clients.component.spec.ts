import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsClientsComponent } from './webs-clients.component';

describe('WebsClientsComponent', () => {
  let component: WebsClientsComponent;
  let fixture: ComponentFixture<WebsClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
