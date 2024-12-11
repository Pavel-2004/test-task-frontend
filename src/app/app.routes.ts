import { Routes } from '@angular/router';
import { GitHubIntegrationComponent } from './github-integration/github-integration.component';
import { ViewOrganizationComponent } from './view-organization/view-organization.component';
import { ViewRepositoryComponent } from './view-repository/view-repository.component';
import { ViewIssueComponent } from './view-issue/view-issue.component';
import { ViewUserComponent } from './user/view-user/view-user.component';


export const routes: Routes = [
  { path: '', component: GitHubIntegrationComponent },
  { path: 'view-organization/:id', component: ViewOrganizationComponent },
  { path: 'view-repository/:id', component: ViewRepositoryComponent },
  { path: 'view-ticket/:id', component: ViewIssueComponent },
  { path: 'view-user/:id', component: ViewUserComponent}
];
