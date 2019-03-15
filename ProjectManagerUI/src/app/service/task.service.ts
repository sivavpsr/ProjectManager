import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TaskModule } from '../model/task/task.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  endpoint: string = `${environment.apiBaseUri}`;

  constructor(private http: HttpClient) {
  }

  
  // get all tasks
  getTasks(): Observable<TaskModule[]> {
    return this.http.get<TaskModule[]>(this.endpoint + '/api/task/gettasks')
    .pipe(
      catchError(e => this.handleError(e)));
  }

  getTasksByProjectId(projectId): Observable<TaskModule[]> {
    return this.http.get<TaskModule[]>(this.endpoint + '/api/task/gettasksbyprojectid/' + projectId)
    .pipe(
      catchError(e => this.handleError(e)));
  }

  getParentTasks(): Observable<TaskModule[]> {
    return this.http.get<TaskModule[]>(this.endpoint + '/api/task/getparenttasks')
    .pipe(
      catchError(e => this.handleError(e)));
  }

  // get task by id
  getTaskById(id: number): Observable<TaskModule> {
    return this.http.get<TaskModule>(this.endpoint + '/api/task/gettaskbyid/' + id)
    .pipe(
      catchError(e => this.handleError(e)));
  }

  // save Task
  saveTask(task: TaskModule): Observable<number> {
    return this.http.post<number>(this.endpoint + '/api/task/save', task)
    .pipe(
      catchError(e => this.handleError(e)));
  }

  // complete Task
  completeTask(id: number): Observable<boolean> {
    return this.http.post<boolean>(this.endpoint + '/api/task/complete', { TaskId: id })
    .pipe(
      catchError(e => this.handleError(e)));
  }
  
  // error handler
  handleError(error: any) {
    console.log(error);
    return throwError("Server error occured");
  }
}
