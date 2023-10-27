import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorpopupComponent } from './errorpopup.component';

describe('ErrorpopupComponent', () => {
  let component: ErrorpopupComponent;
  let fixture: ComponentFixture<ErrorpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
