import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitHubIntegrationService {
  private apiUrl = 'http://localhost:3000/api/github';

  constructor(private http: HttpClient) {}

  connectToGitHub(): Observable<any> {
    return this.http.get(`${this.apiUrl}/connect`);
  }

  disconnectGitHub(): Observable<any> {
    return this.http.get(`${this.apiUrl}/remove`);
  }

  getOrganizations(sortModel: any[], filterModel: any[], startRow: number, endRow: number): Observable<any> {
    const params = {
      sortModel: JSON.stringify(sortModel),
      filterModel: JSON.stringify(filterModel),
      startRow,
      endRow
    }
    return this.http.get(`${this.apiUrl}/data/organizations`, { params })
  }

  getCommits(sortModel: any[], filterModel: any[], startRow: number, endRow: number, repositoryId: string, globalSearch: string): Observable<any> {
    const params = {
      repositoryId,
      sortModel: JSON.stringify(sortModel),
      filterModel: JSON.stringify(filterModel),
      startRow,
      endRow,
      globalSearch
    }
    return this.http.get(`${this.apiUrl}/data/commits`, { params })
  }

  getIssues(sortModel: any[], filterModel: any[], startRow: number, endRow: number, repositoryId: string, globalSearch: string): Observable<any> {
    const params = {
      repositoryId,
      sortModel: JSON.stringify(sortModel),
      filterModel: JSON.stringify(filterModel),
      startRow,
      endRow,
      globalSearch
    }



    return this.http.get(`${this.apiUrl}/data/issues`, { params })
  }

  getPullRequests(sortModel: any[], filterModel: any[], startRow: number, endRow: number, repositoryId: string, globalSearch: string): Observable<any> {
    const params = {
      repositoryId,
      sortModel: JSON.stringify(sortModel),
      filterModel: JSON.stringify(filterModel),
      startRow,
      endRow,
      globalSearch
    }
    return this.http.get(`${this.apiUrl}/data/pulls`, { params })
  }

  getChangeLogs(sortModel: any[], filterModel: any[], startRow: number, endRow: number, repositoryId: string, globalSearch: string): Observable<any> {
    const params = {
      repositoryId,
      sortModel: JSON.stringify(sortModel),
      filterModel: JSON.stringify(filterModel),
      startRow,
      endRow,
      globalSearch
    }
    return this.http.get(`${this.apiUrl}/data/changelogs`, { params })
  }

  getRepositories(sortModel: any[], filterModel: any[], startRow: number, endRow: number, organizationId: string): Observable<any> {
    const params = {
      sortModel: JSON.stringify(sortModel),
      filterModel: JSON.stringify(filterModel),
      startRow,
      endRow,
      organizationId
    }
    return this.http.get(`${this.apiUrl}/data/repos`, { params })
  }

  getUsers(sortModel: any[], filterModel: any[], startRow: number, endRow: number, organizationId: string): Observable<any> {
    const params = {
      sortModel: JSON.stringify(sortModel),
      filterModel: JSON.stringify(filterModel),
      startRow,
      endRow,
      organizationId
    }
    return this.http.get(`${this.apiUrl}/data/users`, { params })
  }

  getIntegrationStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/status`);
  }
}
