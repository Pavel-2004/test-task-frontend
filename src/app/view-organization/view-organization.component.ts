import { Component, OnInit } from '@angular/core';
import { GitHubIntegrationService } from '../services/github-integration.service';
import { CommonModule } from '@angular/common';  
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { AgGridModule } from 'ag-grid-angular';  
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { ViewUsersComponent } from '../view-users/view-users.component';

function dateFormatter(params: any) {
  if (!params.value) {
    return ""
  }
  const date = new Date(params.value);
  return date.toLocaleDateString();
}

@Component({
  selector: 'app-view-organization',
  imports: [
    CommonModule,  
    MatButtonModule,  
    MatExpansionModule,
    AgGridModule,
    ViewUsersComponent
  ],
  templateUrl: './view-organization.component.html',
  styleUrl: './view-organization.component.css'
})


export class ViewOrganizationComponent implements OnInit  {
  organizationId: string = '';
  columnDefs = [
    { headerName: 'Repository Name', field: 'name', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Full Name', field: 'fullName', sortable: true, filter: 'agTextColumnFilter' }, 
    { headerName: 'URL', field: 'url', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Description', field: 'description', sortable: true, filter: 'agTextColumnFilter' }, 
    {
      headerName: 'Private', field: 'private', sortable: true, filter: 'agBooleanColumnFilter'
    },
    { headerName: 'Creation Date', field: 'created_at', sortable: true, filter: 'agDateColumnFilter', valueFormatter: dateFormatter }, 
    { headerName: 'Updated Date', field: 'updated_at', sortable: true, filter: 'agDateColumnFilter', valueFormatter: dateFormatter }, 
    { headerName: 'Action', sortable: false, filter: false, field: 'action', cellRenderer: (params: any) => {
      const button = document.createElement('button');
      button.innerText = 'View';
      button.addEventListener('click', () => {
        const repositoryId = params.data._id; 
        window.location.href = `/view-repository/${repositoryId}`
      });
      return button;
    } }
  ]

  gridOptions: GridOptions = {
    rowModelType: 'infinite',
    cacheBlockSize: 20,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50]
  };

  dataSource = {
    getRows: (params: any) => {
      const sortModel = params.sortModel;
      const filterModel = params.filterModel;

      const { startRow, endRow } = params;

      this.gitHubService.getRepositories(sortModel, filterModel, startRow, endRow, this.organizationId)
        .subscribe(data => {
          params.successCallback(data.rows, data.totalRecords);
        }, error => {
          params.failCallback();
        });
    }
  }

  constructor(private route: ActivatedRoute, private gitHubService: GitHubIntegrationService) {}

  ngOnInit(): void {
    this.organizationId = this.route.snapshot.paramMap.get('id')!;
  }
}
