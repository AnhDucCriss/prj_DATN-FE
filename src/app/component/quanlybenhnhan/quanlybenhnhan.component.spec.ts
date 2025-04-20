import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlybenhnhanComponent } from './quanlybenhnhan.component';

describe('QuanlybenhnhanComponent', () => {
  let component: QuanlybenhnhanComponent;
  let fixture: ComponentFixture<QuanlybenhnhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanlybenhnhanComponent]
    });
    fixture = TestBed.createComponent(QuanlybenhnhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
