import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoadonComponent } from './hoadon.component';

describe('HoadonComponent', () => {
  let component: HoadonComponent;
  let fixture: ComponentFixture<HoadonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoadonComponent]
    });
    fixture = TestBed.createComponent(HoadonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
