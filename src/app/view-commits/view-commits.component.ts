import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';  
import { MatExpansionModule } from '@angular/material/expansion';
import { AgGridModule } from 'ag-grid-angular';  
import { GridOptions, ColDef } from 'ag-grid-community';
import { GitHubIntegrationService } from '../services/github-integration.service';

function dateFormatter(params: { value: string }): string {
  return params.value ? new Date(params.value).toLocaleDateString() : '';
}

@Component({
  selector: 'app-view-commits',
  standalone: true,
  imports: [
    CommonModule,  
    MatButtonModule,  
    MatExpansionModule,
    AgGridModule
  ],
  templateUrl: './view-commits.component.html',
  styleUrl: './view-commits.component.css'
})
export class ViewCommitsComponent {
  @Input() repositoryId = '';

  readonly columnDefs: ColDef[] = [
    { 
      headerName: 'Author Name', 
      field: 'author.name', 
      sortable: true, 
      filter: 'agTextColumnFilter' 
    },
    { 
      headerName: 'Author Email', 
      field: 'author.email', 
      sortable: true, 
      filter: 'agTextColumnFilter' 
    },
    { 
      headerName: 'SHA', 
      field: 'sha', 
      sortable: true, 
      filter: 'agTextColumnFilter' 
    },
    { 
      headerName: 'Message', 
      field: 'message', 
      sortable: true, 
      filter: 'agTextColumnFilter' 
    },
    { 
      headerName: 'Creation Date', 
      field: 'date', 
      sortable: true, 
      filter: 'agDateColumnFilter', 
      valueFormatter: dateFormatter 
    }
  ];

  readonly gridOptions: GridOptions = {
    rowModelType: 'infinite',
    cacheBlockSize: 20,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50]
  };

  dataSource = {
    getRows: (params: { 
      sortModel: any[], 
      filterModel: any, 
      startRow: number, 
      endRow: number, 
      successCallback: (rows: [], totalRecords: number) => void, 
      failCallback: () => void 
    }) => {
      const { sortModel, filterModel, startRow, endRow, successCallback, failCallback } = params;
      
      this.gitHubService.getCommits(sortModel, filterModel, startRow, endRow, this.repositoryId, '')
        .subscribe({
          next: (data: any) => successCallback(data.rows, data.totalRecords),
          error: () => failCallback()
        });
    }
  };

  constructor(private gitHubService: GitHubIntegrationService) {}

  updateCommits(globalSearch: string): void {
    this.dataSource = {
      getRows: (params: any) => {
        const { sortModel, filterModel, startRow, endRow, successCallback, failCallback } = params;
        
        this.gitHubService.getCommits(sortModel, filterModel, startRow, endRow, this.repositoryId, globalSearch)
          .subscribe({
            next: (data: any) => successCallback(data.rows, data.totalRecords),
            error: () => failCallback()
          });
      }
    };
  }
}