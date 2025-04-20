import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsnhanvienComponent } from './dsnhanvien.component';

describe('DsnhanvienComponent', () => {
  let component: DsnhanvienComponent;
  let fixture: ComponentFixture<DsnhanvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DsnhanvienComponent]
    });
    fixture = TestBed.createComponent(DsnhanvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
