import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { ViewCommitsComponent } from "../view-commits/view-commits.component";
import { ViewIssuesComponent } from "../view-issues/view-issues.component";
import { FormsModule } from '@angular/forms';
import { GitHubIntegrationService } from '../services/github-integration.service';

@Component({
  selector: 'app-view-repository',
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    ViewCommitsComponent,
    ViewIssuesComponent,
    FormsModule 
],
  templateUrl: './view-repository.component.html',
  styleUrl: './view-repository.component.css'
})
export class ViewRepositoryComponent implements OnInit {
  @ViewChild(ViewCommitsComponent) viewCommitsComponent!: ViewCommitsComponent;
  @ViewChild(ViewIssuesComponent) ViewIssuesComponent!: ViewIssuesComponent;
  
  repositoryId: string = '';
  search: string = '';
  name: string = '';
  description: string = '';
  url: string = ''

  onSearchEnter() {
    if (this.viewCommitsComponent) {
      this.viewCommitsComponent.updateCommits(this.search)
      this.ViewIssuesComponent.updateIssues(this.search)
    }
  }

  constructor(private route: ActivatedRoute, private gitHubService: GitHubIntegrationService) {}
  
  ngOnInit(): void {
    this.repositoryId = this.route.snapshot.paramMap.get('id')!;
    this.getRepository()
  }

  getRepository(): void {
    this.gitHubService.getRepository(this.repositoryId)
      .subscribe({
        next: (data: any) => {
          this.name = data.repository.name
          this.description = data.repository.description
          this.url = data.repository.url
        },
        error: () => {

        }
      })
  }
}
