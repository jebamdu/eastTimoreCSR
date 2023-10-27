import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageloaderComponent } from './pageloader.component';

describe('PageloaderComponent', () => {
  let component: PageloaderComponent;
  let fixture: ComponentFixture<PageloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
