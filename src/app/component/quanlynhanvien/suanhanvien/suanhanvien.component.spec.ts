import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuanhanvienComponent } from './suanhanvien.component';

describe('SuanhanvienComponent', () => {
  let component: SuanhanvienComponent;
  let fixture: ComponentFixture<SuanhanvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuanhanvienComponent]
    });
    fixture = TestBed.createComponent(SuanhanvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
