import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DstaikhoanComponent } from './dstaikhoan.component';

describe('DstaikhoanComponent', () => {
  let component: DstaikhoanComponent;
  let fixture: ComponentFixture<DstaikhoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DstaikhoanComponent]
    });
    fixture = TestBed.createComponent(DstaikhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
