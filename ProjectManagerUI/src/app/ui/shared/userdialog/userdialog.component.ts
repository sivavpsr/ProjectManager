import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserModule } from '../../../model/user/user.module';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-userdialog',
  templateUrl: './userdialog.component.html',
  styleUrls: ['./userdialog.component.css']
})

export class UserdialogComponent implements OnInit {

  Users: UserModule[];
  public searchText: string;

  constructor(private userService: UserService,
    private dialogRef: MatDialogRef<UserdialogComponent>) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(result => { this.Users = result });
  }

  selectUser(user: UserModule){
    this.dialogRef.close(user);
  }
}
