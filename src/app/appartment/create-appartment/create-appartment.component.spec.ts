import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppartmentComponent } from './create-appartment.component';

describe('CreateAppartmentComponent', () => {
  let component: CreateAppartmentComponent;
  let fixture: ComponentFixture<CreateAppartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAppartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
