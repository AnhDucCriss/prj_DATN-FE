import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlydonthuocComponent } from './quanlydonthuoc.component';

describe('QuanlydonthuocComponent', () => {
  let component: QuanlydonthuocComponent;
  let fixture: ComponentFixture<QuanlydonthuocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanlydonthuocComponent]
    });
    fixture = TestBed.createComponent(QuanlydonthuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
