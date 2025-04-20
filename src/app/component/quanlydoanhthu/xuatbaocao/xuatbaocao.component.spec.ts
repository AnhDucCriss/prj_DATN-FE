import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatbaocaoComponent } from './xuatbaocao.component';

describe('XuatbaocaoComponent', () => {
  let component: XuatbaocaoComponent;
  let fixture: ComponentFixture<XuatbaocaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XuatbaocaoComponent]
    });
    fixture = TestBed.createComponent(XuatbaocaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
