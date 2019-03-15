import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { UserModule } from '../../model/user/user.module';
import { UserService } from '../../service/user.service';
import { MessagedialogComponent } from '../shared/messagedialog/messagedialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  preserveWhitespaces: true
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService,
    private dialog: MatDialog) {
  }

  title: string;
  User: UserModule;
  Users: UserModule[];
  userForm: FormGroup;
  submitted: boolean = false;
  status: boolean;
  error: string;
  actionClicked: boolean;
  messageDialog: MatDialogRef<MessagedialogComponent>;
  buttonText: string;

  searchText: string;
  field: string;
  order: number;

  ngOnInit() {
    this.getUsers();
    this.initializeFormControl();

    this.User = new UserModule();
    this.title = "Add User";
    this.actionClicked = false;
    this.order = 1;    
  }

  initializeFormControl() {
    // new object
    this.userForm = new FormGroup({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required)
    });

    this.buttonText = "Save";
  }

  // get the users
  getUsers() {
    this.userService.getUsers().subscribe(result => this.Users = result);
  }

  addUser() {
    this.actionClicked = true;
    this.title = "Add User";
    this.buttonText = "Add";
    
    this.userForm.patchValue({
      FirstName: '',
      LastName: '',
      UserId: 0
    });
  }

  editUser(id: number) {
    this.actionClicked = true;
    this.title = "Edit User";
    this.buttonText = "Update";

    this.userService.getUserById(id).subscribe(result => {

      this.User = result;

      this.userForm.patchValue({
        FirstName: this.User.FirstName,
        LastName: this.User.LastName,
        UserId: this.User.UserId
      });
    });
  }

  deleteUser(id: number) {

    this.messageDialog = this.dialog.open(MessagedialogComponent, {
      data: { message: "Are you sure to delete the user?" },
      height: "250px",
      width: "400px",
    });

    this.messageDialog.afterClosed().subscribe((response: string) => {
      if (response == "OK") {

        // delete the user upon confirmation
        this.userService.deleteUser(id).subscribe(result => {

          if (result) {
            // reload the table
            this.getUsers();
            this.resetForm();
          }
          else {
            this.error = "Error while saving the task";
          }
        }, error => {
          this.error = "Error while saving the task";
        });
      }
    });
  }

  cancel() {
    this.resetForm();
  }

  resetForm() {
    this.actionClicked = false;
    this.searchText = "";
    this.field = "";
    this.order = 1;
    this.userForm.patchValue({
      FirstName: '',
      LastName: '',
      UserId: 0
    });
  }

  get f() { return this.userForm.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    this.User.FirstName = this.userForm.get('FirstName').value;
    this.User.LastName = this.userForm.get('LastName').value;

    this.userService.saveUser(this.User).subscribe(result => {

      if (result > 0) {
        // reload the table
        this.getUsers();
        this.resetForm();
      }
      else {
        this.error = "Error while saving the task";
      }
    });

    return;
  }

  sortBy(field: string) {
    this.field = field;
    this.order = this.order * (-1);
    return false;
  }
}
