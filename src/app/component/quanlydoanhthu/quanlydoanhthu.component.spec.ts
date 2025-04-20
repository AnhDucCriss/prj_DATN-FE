import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlydoanhthuComponent } from './quanlydoanhthu.component';

describe('QuanlydoanhthuComponent', () => {
  let component: QuanlydoanhthuComponent;
  let fixture: ComponentFixture<QuanlydoanhthuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanlydoanhthuComponent]
    });
    fixture = TestBed.createComponent(QuanlydoanhthuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
