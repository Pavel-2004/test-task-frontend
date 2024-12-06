import { Routes } from '@angular/router';
import { GitHubIntegrationComponent } from './github-integration/github-integration.component';
import { ViewOrganizationComponent } from './view-organization/view-organization.component';
import { ViewRepositoryComponent } from './view-repository/view-repository.component';


export const routes: Routes = [
  { path: '', component: GitHubIntegrationComponent },
  { path: 'view-organization/:id', component: ViewOrganizationComponent },
  { path: 'view-repository/:id', component: ViewRepositoryComponent }
];
