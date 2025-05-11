import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonthuocComponent } from './donthuoc.component';

describe('DonthuocComponent', () => {
  let component: DonthuocComponent;
  let fixture: ComponentFixture<DonthuocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonthuocComponent]
    });
    fixture = TestBed.createComponent(DonthuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
