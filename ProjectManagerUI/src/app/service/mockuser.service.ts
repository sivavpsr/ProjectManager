import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { UserModule } from '../model/user/user.module';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})

export class MockuserService extends UserService {

    dummyUsers: UserModule[] = [
        { UserId: 1, FirstName: "First 1", LastName: "Last 1", UserName: "Last 1, First 1" },
        { UserId: 2, FirstName: "First 2", LastName: "Last 2", UserName: "Last 2, First 2" },
    ]

    // get all users
    getUsers(): Observable<UserModule[]> {
        return of(this.dummyUsers);
    }

    // get user by id
    getUserById(id: number): Observable<UserModule> {
        let user: UserModule = this.dummyUsers.find(t => t.UserId == id);
        return of(user);
    }

    // save user
    saveUser(user: UserModule): Observable<number> {
        let userIndex = this.dummyUsers.findIndex(t => t.UserId == user.UserId);

        if (userIndex < 0) {
            this.dummyUsers.push(user);
        }
        else {
            this.dummyUsers[userIndex] = user;
        }

        return of(user.UserId);
    }

    // delete user
    deleteUser(id: number): Observable<boolean> {
        let userIndex = this.dummyUsers.findIndex(t => t.UserId == id);

        if (userIndex < 0) {
            throwError("User not found")
        }
        else {
            this.dummyUsers.slice(userIndex, 1);
        }

        return of(true);
    }
}
