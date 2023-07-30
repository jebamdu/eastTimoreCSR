import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContendPageComponent } from './contend-page.component';

describe('ContendPageComponent', () => {
  let component: ContendPageComponent;
  let fixture: ComponentFixture<ContendPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContendPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContendPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
