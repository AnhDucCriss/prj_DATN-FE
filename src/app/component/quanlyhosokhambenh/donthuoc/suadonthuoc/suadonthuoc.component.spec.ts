import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaDonThuocComponent } from './suadonthuoc.component';

describe('SuadonthuocComponent', () => {
  let component: SuaDonThuocComponent;
  let fixture: ComponentFixture<SuaDonThuocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuaDonThuocComponent]
    });
    fixture = TestBed.createComponent(SuaDonThuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
