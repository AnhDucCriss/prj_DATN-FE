import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuabenhnhanComponent } from './suabenhnhan.component';

describe('SuabenhnhanComponent', () => {
  let component: SuabenhnhanComponent;
  let fixture: ComponentFixture<SuabenhnhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuabenhnhanComponent]
    });
    fixture = TestBed.createComponent(SuabenhnhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
