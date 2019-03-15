import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProjectModule } from '../model/project/project.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  endpoint: string = `${environment.apiBaseUri}`;

  constructor(private http: HttpClient) {
  }

  // get all projects
  getProjects(): Observable<ProjectModule[]> {
    return this.http.get<ProjectModule[]>(this.endpoint + '/api/project/getprojects')
    .pipe(
      catchError(e => this.handleError(e)));
  }

  // get all projects
  getProjectsForSearch(): Observable<ProjectModule[]> {
    return this.http.get<ProjectModule[]>(this.endpoint + '/api/project/getprojectsforsearch')
    .pipe(
      catchError(e => this.handleError(e)));
  }

  // get project by id
  getProjectById(id: number): Observable<ProjectModule> {
    return this.http.get<ProjectModule>(this.endpoint + '/api/project/getprojectbyid/' + id)
    .pipe(
      catchError(e => this.handleError(e)));
  }

  // add & update Project
  saveProject(proj: ProjectModule): Observable<number> {
    return this.http.post<number>(this.endpoint + '/api/project/save', proj)
    .pipe(
      catchError(e => this.handleError(e)));
  }

  // delete Project
  deleteProject(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.endpoint + '/api/project/delete/' + id)
    .pipe(
      catchError(e => this.handleError(e)));
  }

  // suspend Project
  suspendProject(id: number): Observable<boolean> {
    return this.http.post<boolean>(this.endpoint + '/api/project/suspend', { ProjectId: id })
    .pipe(
      catchError(e => this.handleError(e)));
  }
  
  // error handler
  handleError(error: any) {
    console.log(error);
    return throwError("Server error occured");
  }
}
