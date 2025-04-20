import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThembenhnhanComponent } from './thembenhnhan.component';

describe('ThembenhnhanComponent', () => {
  let component: ThembenhnhanComponent;
  let fixture: ComponentFixture<ThembenhnhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThembenhnhanComponent]
    });
    fixture = TestBed.createComponent(ThembenhnhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
