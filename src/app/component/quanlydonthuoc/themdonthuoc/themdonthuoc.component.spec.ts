import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemdonthuocComponent } from './themdonthuoc.component';

describe('ThemdonthuocComponent', () => {
  let component: ThemdonthuocComponent;
  let fixture: ComponentFixture<ThemdonthuocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemdonthuocComponent]
    });
    fixture = TestBed.createComponent(ThemdonthuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
