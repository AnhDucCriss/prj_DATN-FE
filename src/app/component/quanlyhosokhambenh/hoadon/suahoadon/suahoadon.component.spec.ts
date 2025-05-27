import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuahoadonComponent } from './suahoadon.component';

describe('SuahoadonComponent', () => {
  let component: SuahoadonComponent;
  let fixture: ComponentFixture<SuahoadonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuahoadonComponent]
    });
    fixture = TestBed.createComponent(SuahoadonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
