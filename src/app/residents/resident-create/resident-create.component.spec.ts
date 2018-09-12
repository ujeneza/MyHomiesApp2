import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentCreateComponent } from './resident-create.component';

describe('ResidentCreateComponent', () => {
  let component: ResidentCreateComponent;
  let fixture: ComponentFixture<ResidentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
