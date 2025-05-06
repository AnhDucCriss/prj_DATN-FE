import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DshskhambenhComponent } from './dshskhambenh.component';

describe('DshskhambenhComponent', () => {
  let component: DshskhambenhComponent;
  let fixture: ComponentFixture<DshskhambenhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DshskhambenhComponent]
    });
    fixture = TestBed.createComponent(DshskhambenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
