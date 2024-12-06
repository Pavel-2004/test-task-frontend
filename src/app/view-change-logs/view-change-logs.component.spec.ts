import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChangeLogsComponent } from './view-change-logs.component';

describe('ViewChangeLogsComponent', () => {
  let component: ViewChangeLogsComponent;
  let fixture: ComponentFixture<ViewChangeLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewChangeLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChangeLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
