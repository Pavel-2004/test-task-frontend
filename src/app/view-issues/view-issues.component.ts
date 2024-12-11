import { Component, Input } from '@angular/core';
import { GitHubIntegrationService } from '../services/github-integration.service';
import { CommonModule } from '@angular/common';  
import { MatButtonModule } from '@angular/material/button';  
import { MatExpansionModule } from '@angular/material/expansion';
import { AgGridModule } from 'ag-grid-angular'; 
import { GridOptions } from 'ag-grid-community';

function dateFormatter(params: any) {
  if (!params.value) {
    return ""
  }
  const date = new Date(params.value);
  return date.toLocaleDateString(); 
}

@Component({
  selector: 'app-view-issues',
  imports: [
    CommonModule,  
    MatButtonModule,  
    MatExpansionModule,
    AgGridModule
  ],
  templateUrl: './view-issues.component.html',
  styleUrl: './view-issues.component.css'
})
export class ViewIssuesComponent {
  @Input() repositoryId: string = '';
  columnDefs = [
    { headerName: 'Action', sortable: false, filter: false, field: 'action', cellRenderer: (params: any) => {
      const button = document.createElement('button');
      button.innerText = 'View';
      button.addEventListener('click', () => {
        const ticketId = params.data._id; 
        window.location.href = `/view-ticket/${ticketId}`
      });
      return button;
    } },
    { 
      headerName: 'Avatar', 
      field: 'user.avatarUrl', 
      sortable: false, 
      filter: false,
      cellRenderer: (params: any) => {
        return params.value 
          ? `<img src="${params.value}" alt="User Avatar" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"/>` 
          : '';
      }
    },
    { headerName: 'User', field: 'user.login', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'title', field: 'title', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Body', field: 'body', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'State', field: 'state', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Number', field: 'number', sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'Creation Date', field: 'created_at', sortable: true, filter: 'agDateColumnFilter', valueFormatter: dateFormatter },
    { headerName: 'Updated Date', field: 'updated_at', sortable: true, filter: 'agDateColumnFilter', valueFormatter: dateFormatter }, 
  ]

  gridOptions: GridOptions = {
    rowModelType: 'infinite',
    cacheBlockSize: 20,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50]
  };

  constructor(private gitHubService: GitHubIntegrationService) {}
  
  dataSource = {
    getRows: (params: any) => {
      const sortModel = params.sortModel;
      const filterModel = params.filterModel;

      const { startRow, endRow } = params;

      this.gitHubService.getIssues(sortModel, filterModel, startRow, endRow, this.repositoryId, '')
        .subscribe(data => {
          params.successCallback(data.rows, data.totalRecords); 
        }, error => {
          console.log(error, 'error')
          params.failCallback();
        });
    }
  }

  updateIssues(globalSearch: string): void {
    this.dataSource = {
      getRows: (params: any) => {
        const { sortModel, filterModel, startRow, endRow, successCallback, failCallback } = params;
        
        this.gitHubService.getIssues(sortModel, filterModel, startRow, endRow, this.repositoryId, globalSearch)
          .subscribe({
            next: (data: any) => successCallback(data.rows, data.totalRecords),
            error: () => failCallback()
          });
      }
    };
  }
}
