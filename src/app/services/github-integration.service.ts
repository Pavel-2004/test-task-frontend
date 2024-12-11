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

  getOrganization(organizationId: string) : Observable<any> {
    return this.http.get(`${this.apiUrl}/data/organizations/${organizationId}`)
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

  getCommitsUser(sortModel: any[], filterModel: any[], startRow: number, endRow: number, userId: string, globalSearch: string): Observable<any> {
    const params = {
      userId,
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

  getIssuesUser(sortModel: any[], filterModel: any[], startRow: number, endRow: number, userId: string, globalSearch: string): Observable<any> {
    const params = {
      userId,
      sortModel: JSON.stringify(sortModel),
      filterModel: JSON.stringify(filterModel),
      startRow,
      endRow,
      globalSearch
    }

    return this.http.get(`${this.apiUrl}/data/issues`, { params })
  }

  getIssue(issueId: string) : Observable<any> {
    return this.http.get(`${this.apiUrl}/data/issues/${issueId}`)
  }

  getChangeLogs(sortModel: any[], filterModel: any[], startRow: number, endRow: number, issueId: string): Observable<any> {
    console.log(issueId, 'issue id')
    const params = {
      sortModel: JSON.stringify(sortModel),
      filterModel: JSON.stringify(filterModel),
      startRow,
      endRow,
      issueId
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

  getRepository(repositoryId: string):  Observable<any> {
    return this.http.get(`${this.apiUrl}/data/repos/${repositoryId}`)
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

  getUser(userId: string):  Observable<any> {
    return this.http.get(`${this.apiUrl}/data/users/${userId}`)
  }

  getIntegrationStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/status`);
  }
}
