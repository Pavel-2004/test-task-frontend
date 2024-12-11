import { Component, Input } from '@angular/core';
import { GitHubIntegrationService } from '../services/github-integration.service';
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';  
import { MatExpansionModule } from '@angular/material/expansion';
import { AgGridModule } from 'ag-grid-angular'; 
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-view-users',
  imports: [
    CommonModule,  
    MatButtonModule,  
    MatExpansionModule,
    AgGridModule
  ],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent {
  @Input() organizationId: string = '';
  columnDefs = [
    { headerName: 'Action', sortable: false, filter: false, field: 'action', cellRenderer: (params: any) => {
      const button = document.createElement('button');
      button.innerText = 'View';
      button.addEventListener('click', () => {
        const userId = params.data._id; 
        window.location.href = `/view-user/${userId}`
      });
      return button;
    } },
    { 
      headerName: 'Avatar', 
      field: 'avatarUrl', 
      sortable: false, 
      filter: false,
      cellRenderer: (params: any) => {
        return params.value 
          ? `<img src="${params.value}" alt="User Avatar" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"/>` 
          : '';
      }
    },
    { headerName: 'Username', field: 'login', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Profile URL', field: 'url', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Admin', field: 'admin', sortable: true, filter: 'agBooleanColumnFilter' },
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

      this.gitHubService.getUsers(sortModel, filterModel, startRow, endRow, this.organizationId)
        .subscribe(data => {
          params.successCallback(data.rows, data.totalRecords);
        }, error => {
          console.log(error, 'error')
          params.failCallback();
        });
    }
  }
}
