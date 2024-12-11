import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommitsComponent } from './view-commits.component';

describe('ViewCommitsComponent', () => {
  let component: ViewCommitsComponent;
  let fixture: ComponentFixture<ViewCommitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCommitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
