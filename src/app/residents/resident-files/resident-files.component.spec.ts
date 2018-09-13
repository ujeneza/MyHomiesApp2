import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentFilesComponent } from './resident-files.component';

describe('ResidentFilesComponent', () => {
  let component: ResidentFilesComponent;
  let fixture: ComponentFixture<ResidentFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
