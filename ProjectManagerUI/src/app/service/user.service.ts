import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserModule } from '../model/user/user.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = `${environment.apiBaseUri}`;

  constructor(private http: HttpClient) {
  }

  // get all users
  getUsers(): Observable<UserModule[]> {
    return this.http.get<UserModule[]>(this.endpoint + '/api/user/getusers')
    .pipe(
      catchError(e => this.handleError(e)));
  }

  // get user by id
  getUserById(id: number): Observable<UserModule> {
    return this.http.get<UserModule>(this.endpoint + '/api/user/getuserbyid/' + id)
    .pipe(
      catchError(e => this.handleError(e)));
  }

  // save user
  saveUser(user: UserModule): Observable<number> {
    return this.http.post<number>(this.endpoint + '/api/user/save', user)
    .pipe(
      catchError(e => this.handleError(e)));
  }

  // delete user
  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.endpoint + '/api/user/delete/' + id)
    .pipe(
      catchError(e => this.handleError(e)));
  }
  
  // error handler
  handleError(error: any) {
    console.log(error);
    return throwError("Server error occured");
  }
}
