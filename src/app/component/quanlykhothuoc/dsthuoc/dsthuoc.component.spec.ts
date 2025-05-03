import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsthuocComponent } from './dsthuoc.component';

describe('DsthuocComponent', () => {
  let component: DsthuocComponent;
  let fixture: ComponentFixture<DsthuocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DsthuocComponent]
    });
    fixture = TestBed.createComponent(DsthuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
