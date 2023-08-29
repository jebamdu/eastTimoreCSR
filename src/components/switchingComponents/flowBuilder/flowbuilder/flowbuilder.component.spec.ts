import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowbuilderComponent } from './flowbuilder.component';

describe('FlowbuilderComponent', () => {
  let component: FlowbuilderComponent;
  let fixture: ComponentFixture<FlowbuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowbuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
