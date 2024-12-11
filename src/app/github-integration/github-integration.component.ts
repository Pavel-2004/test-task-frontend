import { Component, OnInit } from '@angular/core';
import { GitHubIntegrationService } from '../services/github-integration.service';
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';  
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AgGridModule } from 'ag-grid-angular'; 
import { GridOptions } from 'ag-grid-community';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';



@Component({
  selector: 'app-github-integration',
  standalone: true,
  imports: [
    CommonModule,  
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    AgGridModule,
    MatSnackBarModule
  ],
  providers: [
    MatSnackBar
  ],
  templateUrl: './github-integration.component.html',
  styleUrls: ['./github-integration.component.css']
})
export class GitHubIntegrationComponent implements OnInit {
  githubUserName: string = "";
  createdAt: string = "";
  isConnected: boolean = false;
  panelExpanded: boolean = false;
  
  isLoadingStatus: boolean = true;
  isDisconnecting: boolean = false;
  isLoadingOrganizations: boolean = false;

  columnDefs = [
    { headerName: 'Organization Name', field: 'name', sortable: true, filter: 'agTextColumnFilter' }, 
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
    paginationPageSizeSelector: [10, 20, 50],
    onGridReady: () => {
      // Reset loading state when grid is ready
      this.isLoadingOrganizations = false;
    }
  };

  dataSource = {
    getRows: (params: any) => {
      this.isLoadingOrganizations = true;
      const sortModel = params.sortModel;
      const filterModel = params.filterModel;
      const { startRow, endRow } = params;
      this.gitHubService.getOrganizations(sortModel, filterModel, startRow, endRow)
        .subscribe({
          next: (data) => {
            console.log(data.rows, 'rows')
            params.successCallback(data.rows, data.totalRecords);
            this.isLoadingOrganizations = false;
          },
          error: (error) => {
            params.failCallback();
            this.isLoadingOrganizations = false;
          }
        });
    }
  }

  constructor(private gitHubService: GitHubIntegrationService,   private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.checkIntegrationStatus();
    //this.showErrorToast("test test")
  }

  showErrorToast(message: string, duration: number = 5000) {
    this.snackBar.open(message, 'Close', {
      duration: duration,
      panelClass: ['error-toast']
    });
  }

  checkIntegrationStatus() {
    this.isLoadingStatus = true;
    this.gitHubService.getIntegrationStatus().subscribe({
      next: (status) => {
        this.githubUserName = status.githubUsername;
        this.createdAt = status.createdAt;
        this.isConnected = true;
        this.isLoadingStatus = false;
      },
      error: (error) => {
        console.log(error, 'error')
        this.isConnected = false;
        this.isLoadingStatus = false;
      }
    });
  }

  disconnect() {
    this.isDisconnecting = true;
    this.gitHubService.disconnectGitHub().subscribe({
      next: (response) => {
        this.isConnected = false;
        this.isDisconnecting = false;
      },
      error: (error) => {
        console.error('Error connecting to GitHub:', error);
        this.isDisconnecting = false;
      }
    });
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