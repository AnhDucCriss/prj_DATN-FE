import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuadonthuocComponent } from './suadonthuoc.component';

describe('SuadonthuocComponent', () => {
  let component: SuadonthuocComponent;
  let fixture: ComponentFixture<SuadonthuocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuadonthuocComponent]
    });
    fixture = TestBed.createComponent(SuadonthuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
