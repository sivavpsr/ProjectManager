import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { UserService } from './user.service';
import { MockuserService } from './mockuser.service';
import { UserModule } from '../model/user/user.module';

describe('UserService', () => {

  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: UserService, useClass: MockuserService }
      ]
    });

    service = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getusers', () => {
    let users: UserModule[];
    service.getUsers().subscribe(result => { users = result });
    expect(users.length).toBeGreaterThanOrEqual(0);
  });  

  it('#getuserbyid', () => {
    let user: UserModule;
    const userId = 1;
    service.getUserById(userId).subscribe(result => { user = result });
    expect(user.UserId).toBe(userId);
  }); 

  it('#addUser', () => {
    let user: UserModule;
    let response: number;

    user = { 
      UserId: 3, 
      FirstName: "First 3", 
      LastName: "Last 3", 
      UserName: "Last 3, First 3"
    };

    service.saveUser(user).subscribe(result => {  response = result });
    expect(response).toBe(user.UserId);
  }); 

  it('#updateUser', () => {
    let user: UserModule;
    let response: number;

    user = { 
      UserId: 3, 
      FirstName: "First 3 updated", 
      LastName: "Last 3 updated", 
      UserName: "Last 3 updated, First 3 updated"
    };

    service.saveUser(user).subscribe(result => {  response = result });
    expect(response).toBe(user.UserId);
  }); 

  it('#deleteUser', () => {    
    let response: boolean;
    const userId = 3;
    service.deleteUser(userId).subscribe(result => {  response = result });
    expect(response).toBe(true);
  }); 
});
