import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsbenhnhanComponent } from './dsbenhnhan.component';

describe('DsbenhnhanComponent', () => {
  let component: DsbenhnhanComponent;
  let fixture: ComponentFixture<DsbenhnhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DsbenhnhanComponent]
    });
    fixture = TestBed.createComponent(DsbenhnhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
