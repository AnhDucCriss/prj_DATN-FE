import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemsuataikhoanComponent } from './themsuataikhoan.component';

describe('ThemsuataikhoanComponent', () => {
  let component: ThemsuataikhoanComponent;
  let fixture: ComponentFixture<ThemsuataikhoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemsuataikhoanComponent]
    });
    fixture = TestBed.createComponent(ThemsuataikhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
