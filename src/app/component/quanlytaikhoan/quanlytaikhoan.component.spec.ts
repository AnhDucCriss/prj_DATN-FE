import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlytaikhoanComponent } from './quanlytaikhoan.component';

describe('QuanlytaikhoanComponent', () => {
  let component: QuanlytaikhoanComponent;
  let fixture: ComponentFixture<QuanlytaikhoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanlytaikhoanComponent]
    });
    fixture = TestBed.createComponent(QuanlytaikhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
