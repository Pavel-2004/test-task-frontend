import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { ViewCommitsComponent } from '../components/view-commits/view-commits.component';
import { ViewIssuesComponent } from '../components/view-issues/view-issues.component';
import { FormsModule } from '@angular/forms';
import { GitHubIntegrationService } from '../../services/github-integration.service';

@Component({
  selector: 'app-view-user',
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    ViewCommitsComponent,
    ViewIssuesComponent,
    FormsModule 
  ],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent implements OnInit {
  @ViewChild(ViewCommitsComponent) viewCommitsComponent!: ViewCommitsComponent;
  @ViewChild(ViewIssuesComponent) ViewIssuesComponent!: ViewIssuesComponent;

  userId: string = '';
  search: string = '';
  login: string = '';
  avatarUrl: string = '';


  onSearchEnter() {
    if (this.viewCommitsComponent) {
      this.viewCommitsComponent.updateCommits(this.search)
      this.ViewIssuesComponent.updateIssues(this.search)
    }
  }

  constructor(private route: ActivatedRoute, private gitHubService: GitHubIntegrationService) {}
  
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.getUser()
  }

  getUser(): void {
    this.gitHubService.getUser(this.userId)
      .subscribe(data => {
        console.log(data, 'data')
        const user = data.user
        this.login = user.login
        this.avatarUrl = user.avatarUrl
      }, error => {

      })
  }
}
