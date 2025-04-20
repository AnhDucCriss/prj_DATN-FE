import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemnhanvienComponent } from './themnhanvien.component';

describe('ThemnhanvienComponent', () => {
  let component: ThemnhanvienComponent;
  let fixture: ComponentFixture<ThemnhanvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemnhanvienComponent]
    });
    fixture = TestBed.createComponent(ThemnhanvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
