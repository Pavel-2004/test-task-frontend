import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRepositoryComponent } from './view-repository.component';

describe('ViewRepositoryComponent', () => {
  let component: ViewRepositoryComponent;
  let fixture: ComponentFixture<ViewRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRepositoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
