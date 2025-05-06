import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuahskhambenhComponent } from './suahskhambenh.component';

describe('SuahskhambenhComponent', () => {
  let component: SuahskhambenhComponent;
  let fixture: ComponentFixture<SuahskhambenhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuahskhambenhComponent]
    });
    fixture = TestBed.createComponent(SuahskhambenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
