import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentViewComponent } from './resident-view.component';

describe('ResidentViewComponent', () => {
  let component: ResidentViewComponent;
  let fixture: ComponentFixture<ResidentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
