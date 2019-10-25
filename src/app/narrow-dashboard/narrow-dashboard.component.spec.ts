import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NarrowDashboardComponent } from './narrow-dashboard.component';

describe('NarrowDashboardComponent', () => {
  let component: NarrowDashboardComponent;
  let fixture: ComponentFixture<NarrowDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NarrowDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrowDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
