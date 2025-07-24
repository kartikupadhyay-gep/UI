import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Unroll } from './unroll';

describe('Unroll', () => {
  let component: Unroll;
  let fixture: ComponentFixture<Unroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Unroll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Unroll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
