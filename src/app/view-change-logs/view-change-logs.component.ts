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
  selector: 'app-view-change-logs',
  imports: [
    CommonModule,  
    MatButtonModule,  
    MatExpansionModule,
    AgGridModule
  ],
  templateUrl: './view-change-logs.component.html',
  styleUrl: './view-change-logs.component.css'
})
export class ViewChangeLogsComponent {
  @Input() repositoryId: string = '';
  columnDefs = [
    { headerName: 'User', field: 'user', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Messsage', field: 'message', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Creation Date', field: 'created_at', sortable: true, filter: 'agDateColumnFilter', valueFormatter: dateFormatter }, 
    { headerName: 'Published Date', field: 'published_at', sortable: true, filter: 'agDateColumnFilter', valueFormatter: dateFormatter }, 
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

      this.gitHubService.getChangeLogs(sortModel, filterModel, startRow, endRow, this.repositoryId, '')
        .subscribe(data => {
          params.successCallback(data.rows, data.totalRecords);
        }, error => {
          params.failCallback();
        });
    }
  }

  updateChangeLogs(globalSearch: string): void {
    this.dataSource = {
      getRows: (params: any) => {
        const { sortModel, filterModel, startRow, endRow, successCallback, failCallback } = params;
        
        this.gitHubService.getChangeLogs(sortModel, filterModel, startRow, endRow, this.repositoryId, globalSearch)
          .subscribe({
            next: (data: any) => successCallback(data.rows, data.totalRecords),
            error: () => failCallback()
          });
      }
    };
  }
}
