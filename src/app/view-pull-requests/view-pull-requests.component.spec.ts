import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPullRequestsComponent } from './view-pull-requests.component';

describe('ViewPullRequestsComponent', () => {
  let component: ViewPullRequestsComponent;
  let fixture: ComponentFixture<ViewPullRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPullRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPullRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
