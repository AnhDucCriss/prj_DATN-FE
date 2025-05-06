import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemhskhambenhComponent } from './themhskhambenh.component';

describe('ThemhskhambenhComponent', () => {
  let component: ThemhskhambenhComponent;
  let fixture: ComponentFixture<ThemhskhambenhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemhskhambenhComponent]
    });
    fixture = TestBed.createComponent(ThemhskhambenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
