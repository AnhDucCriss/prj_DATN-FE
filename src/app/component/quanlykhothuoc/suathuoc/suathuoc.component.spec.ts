import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuathuocComponent } from './suathuoc.component';

describe('SuathuocComponent', () => {
  let component: SuathuocComponent;
  let fixture: ComponentFixture<SuathuocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuathuocComponent]
    });
    fixture = TestBed.createComponent(SuathuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
