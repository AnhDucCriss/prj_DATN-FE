import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlykhothuocComponent } from './quanlykhothuoc.component';

describe('QuanlykhothuocComponent', () => {
  let component: QuanlykhothuocComponent;
  let fixture: ComponentFixture<QuanlykhothuocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanlykhothuocComponent]
    });
    fixture = TestBed.createComponent(QuanlykhothuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
