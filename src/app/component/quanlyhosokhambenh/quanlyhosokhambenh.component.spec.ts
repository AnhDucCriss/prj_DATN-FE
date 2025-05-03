import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyhosokhambenhComponent } from './quanlyhosokhambenh.component';

describe('QuanlyhosokhambenhComponent', () => {
  let component: QuanlyhosokhambenhComponent;
  let fixture: ComponentFixture<QuanlyhosokhambenhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanlyhosokhambenhComponent]
    });
    fixture = TestBed.createComponent(QuanlyhosokhambenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
