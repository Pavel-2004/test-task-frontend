import { Component, OnInit } from '@angular/core';
import { GitHubIntegrationService } from '../services/github-integration.service';
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';  
import { MatExpansionModule } from '@angular/material/expansion';
import { AgGridModule } from 'ag-grid-angular'; 
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-github-integration',
  standalone: true,
  imports: [
    CommonModule,  
    MatButtonModule,
    MatExpansionModule,
    AgGridModule
  ],
  templateUrl: './github-integration.component.html',
  styleUrls: ['./github-integration.component.css']
})
export class GitHubIntegrationComponent implements OnInit {
  githubUserName: string = "";
  createdAt: string = "";
  isConnected: boolean = false;
  panelExpanded: boolean = false;
  columnDefs = [
    { headerName: 'Organization Name', field: 'login', sortable: true, filter: 'agTextColumnFilter' }, 
    { headerName: 'Organization ID', field: 'id', sortable: true, filter: 'agNumberColumnFilter', type: 'numericColumn' }, 
    { headerName: 'Organization URL', field: 'url', sortable: true, filter: 'agTextColumnFilter' }, 
    { headerName: 'Organization Description', field: 'description', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Action', sortable: false, filter: false, field: 'action', cellRenderer: (params: any) => {
      const button = document.createElement('button');
      button.innerText = 'View';
      button.addEventListener('click', () => {
        const organizationId = params.data._id;
        window.location.href = `/view-organization/${organizationId}`
      });
      return button;
    } }
  ];

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

      this.gitHubService.getOrganizations(sortModel, filterModel, startRow, endRow)
        .subscribe(data => {
          params.successCallback(data.rows, data.totalRecords);
        }, error => {
          params.failCallback();
        });
    }
  }

  constructor(private gitHubService: GitHubIntegrationService) {}

  ngOnInit() {
    this.checkIntegrationStatus();
  }

  checkIntegrationStatus() {
    this.gitHubService.getIntegrationStatus().subscribe({
      next: (status) => {
        this.githubUserName = status.githubUsername;
        this.createdAt = status.createdAt;
        this.isConnected = true;
      },
      error: (error) => {
        this.isConnected = false;
      }
    });
  }

  disconnect() {
    this.gitHubService.disconnectGitHub().subscribe({
      next: (response) => {
        this.isConnected = false
      },
      error: (error) => {
        console.error('Error connecting to GitHub:', error);
      }
    })
  }

  connect() {
    this.gitHubService.connectToGitHub().subscribe({
      next: (response) => {
        window.location.href = response.authUrl;
      },
      error: (error) => {
        console.error('Error connecting to GitHub:', error);
      }
    });
  }
}
