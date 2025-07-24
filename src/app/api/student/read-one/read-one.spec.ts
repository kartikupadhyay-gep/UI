import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOne } from './read-one';

describe('ReadOne', () => {
  let component: ReadOne;
  let fixture: ComponentFixture<ReadOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadOne);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
