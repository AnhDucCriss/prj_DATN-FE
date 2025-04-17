import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuataikhoanComponent } from './suataikhoan.component';

describe('SuataikhoanComponent', () => {
  let component: SuataikhoanComponent;
  let fixture: ComponentFixture<SuataikhoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuataikhoanComponent]
    });
    fixture = TestBed.createComponent(SuataikhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
