import { Component, OnInit } from '@angular/core';
import { GitHubIntegrationService } from '../services/github-integration.service';
import { CommonModule } from '@angular/common';  
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { AgGridModule } from 'ag-grid-angular';  
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';

function dateFormatter(params: any) {
  if (!params.value) {
    return ""
  }
  const date = new Date(params.value);
  return date.toLocaleDateString();
}

@Component({
  selector: 'app-view-issue',
  imports: [
    CommonModule,  
    MatButtonModule,  
    MatExpansionModule,
    AgGridModule,
  ],
  templateUrl: './view-issue.component.html',
  styleUrl: './view-issue.component.css'
})
export class ViewIssueComponent implements OnInit {
  issueId: string = '';
  avatarUrl: string = '';
  user: string = ''
  body: string = '';
  status: string = '';
  title: string  = '';
  createdAt: string = '';
  

  columnDefs = [
    { 
      headerName: '', 
      field: 'user.avatarUrl', 
      sortable: false, 
      filter: false,
      cellRenderer: (params: any) => {
        return params.value 
          ? `<img src="${params.value}" alt="User Avatar" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"/>` 
          : '';
      }
    },
    { 
      headerName: 'Author Name', 
      field: 'user.login', 
      sortable: true, 
      filter: 'agTextColumnFilter' 
    },
    { 
      headerName: 'Event', 
      field: 'event', 
      sortable: true, 
      filter: 'agTextColumnFilter' 
    },
    { 
      headerName: 'Creation Date', 
      field: 'created_at', 
      sortable: true, 
      filter: 'agDateColumnFilter', 
      valueFormatter: dateFormatter 
    },
  ]

  constructor(private route: ActivatedRoute, private gitHubService: GitHubIntegrationService) {}

  ngOnInit(): void {
    this.issueId = this.route.snapshot.paramMap.get('id')!;
    this.getIssue()
  }

  getIssue(): void {
    this.gitHubService.getIssue(this.issueId)
    .subscribe(data => {
      console.log(data, 'data')
      const issue = data.issue
      this.avatarUrl = issue.user.avatarUrl
      this.body = issue.body
      this.status = issue.state
      this.user = issue.user.login
      this.title = issue.title
      this.createdAt = new Date(issue.created_at).toLocaleDateString()
    }, error => {

    })
  }

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

      this.gitHubService.getChangeLogs(sortModel, filterModel, startRow, endRow, this.issueId)
        .subscribe(data => {
          params.successCallback(data.rows, data.totalRecords);
        }, error => {
          console.log(this.issueId, 'issue ID')
          console.log(error, 'error')
          params.failCallback();
        });
    }
  }
}
