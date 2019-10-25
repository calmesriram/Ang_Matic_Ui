import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenucontentComponent } from './menucontent.component';

describe('MenucontentComponent', () => {
  let component: MenucontentComponent;
  let fixture: ComponentFixture<MenucontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenucontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenucontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
