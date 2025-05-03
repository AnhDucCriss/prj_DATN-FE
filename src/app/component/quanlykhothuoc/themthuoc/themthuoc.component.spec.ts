import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemthuocComponent } from './themthuoc.component';

describe('ThemthuocComponent', () => {
  let component: ThemthuocComponent;
  let fixture: ComponentFixture<ThemthuocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemthuocComponent]
    });
    fixture = TestBed.createComponent(ThemthuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
