import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf
import { MatButtonModule } from '@angular/material/button';  // For Angular Material buttons
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { ViewCommitsComponent } from "../view-commits/view-commits.component";
import { ViewIssuesComponent } from "../view-issues/view-issues.component";
import { ViewPullRequestsComponent } from "../view-pull-requests/view-pull-requests.component";
import { ViewChangeLogsComponent } from "../view-change-logs/view-change-logs.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-repository',
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    ViewCommitsComponent,
    ViewIssuesComponent,
    ViewPullRequestsComponent,
    ViewChangeLogsComponent,
    FormsModule 
],
  templateUrl: './view-repository.component.html',
  styleUrl: './view-repository.component.css'
})
export class ViewRepositoryComponent implements OnInit {
  @ViewChild(ViewCommitsComponent) viewCommitsComponent!: ViewCommitsComponent;
  @ViewChild(ViewIssuesComponent) ViewIssuesComponent!: ViewIssuesComponent;
  @ViewChild(ViewPullRequestsComponent) ViewPullRequestsComponent!: ViewPullRequestsComponent;
  @ViewChild(ViewChangeLogsComponent) ViewChangeLogsComponent!: ViewChangeLogsComponent;
  
  repositoryId: string = '';
  search: string = '';

  onSearchEnter() {
    if (this.viewCommitsComponent) {
      this.viewCommitsComponent.updateCommits(this.search)
      this.ViewIssuesComponent.updateIssues(this.search)
      this.ViewPullRequestsComponent.updatePullRequests(this.search)
      this.ViewChangeLogsComponent.updateChangeLogs(this.search)
    }
  }

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.repositoryId = this.route.snapshot.paramMap.get('id')!;
  }
}
