import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material'
import { ProjectModule } from 'src/app/model/project/project.module';
import { ProjectService } from 'src/app/service/project.service';
import { UserdialogComponent } from 'src/app/ui/shared/userdialog/userdialog.component';
import { UserModule } from 'src/app/model/user/user.module';
import { formatDate } from '@angular/common';
import { MessagedialogComponent } from '../shared/messagedialog/messagedialog.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  preserveWhitespaces: true
})
export class ProjectComponent implements OnInit {

  constructor(private projectService: ProjectService,
    private dialog: MatDialog) { }

  title: string;
  buttonText: string;
  Project: ProjectModule;
  Projects: ProjectModule[];
  projectForm: FormGroup;
  submitted: boolean = false;
  status: boolean;
  error: string;
  actionClicked: boolean;
  userDialog: MatDialogRef<UserdialogComponent>;
  messageDialog: MatDialogRef<MessagedialogComponent>;
  managerId: number;
  startDateRequired: boolean
  endDateRequired: boolean
  startDateGreater: boolean

  searchText: string;
  field: string;
  order: number;

  public properties: string[] = ["ProjectDescription", "StartDate", "EndDate", "Priority", "TaskCount", "CompletedTaskCouunt"]

  ngOnInit() {
    this.getProjects();
    this.initializeFormControl();
    this.order = 1;
  }

  initializeFormControl() {

    this.Project = new ProjectModule();

    // new object
    this.projectForm = new FormGroup({
      ProjectDescription: new FormControl('', Validators.required),
      Manager: new FormControl('', Validators.required),
      Priority: new FormControl(0, Validators.min(1)),
      DateRequired: new FormControl(false),
      StartDate: new FormControl({ value: null, disable: true }),
      EndDate: new FormControl({ value: null, disable: true })
    });

    this.toggleDate();

    this.buttonText = "Save";
  }

  get f() { return this.projectForm.controls; }

  // get the projects
  getProjects() {
    this.projectService.getProjects().subscribe(result => this.Projects = result);
  }

  toggleDate() {

    this.startDateRequired = false;
    this.endDateRequired = false;
    this.startDateGreater = false;

    let dateRequired = this.projectForm.controls['DateRequired'].value;

    if (dateRequired) {
      let today = new Date();
      let todayplus1 = new Date();
      todayplus1.setDate(today.getDate() + 1);

      this.projectForm.patchValue({
        StartDate: formatDate(today, 'yyyy-MM-dd', 'en-US'),
        EndDate: formatDate(todayplus1, 'yyyy-MM-dd', 'en-US')
      })

      this.projectForm.controls['StartDate'].enable();
      this.projectForm.controls['EndDate'].enable();
    }
    else {
      this.projectForm.patchValue({
        StartDate: new FormControl({ value: null }),
        EndDate: new FormControl({ value: null })
      })
      this.projectForm.controls['StartDate'].disable();
      this.projectForm.controls['EndDate'].disable();
    }
  }

  openUserDialog() {

    this.userDialog = this.dialog.open(UserdialogComponent, {
      height: "400px", width: "600px"
    });

    this.userDialog.afterClosed().subscribe((user: UserModule) => {
      if (user != null) {
        this.projectForm.patchValue({
          Manager: user.LastName + ", " + user.FirstName
        })
        this.managerId = user.UserId;
      }
    });
  }

  resetForm() {
    this.actionClicked = false;
    this.buttonText = "Save";
    this.Project = new ProjectModule();
    this.managerId = 0;
    this.startDateRequired = false;
    this.endDateRequired = false;
    this.startDateGreater = false;

    this.projectForm.patchValue({
      ProjectDescription: '',
      ManagerId: '',
      Manager: '',
      Priority: 0,
      StartDate: null,
      EndDate: null
    });
  }

  cancel() {
    this.resetForm();
  }

  addProject() {
    this.resetForm();
    this.actionClicked = true;
    this.title = "Add Project";
    this.buttonText = "Add";
    this.toggleDate();
  }

  editProject(id: number) {
    this.actionClicked = true;
    this.title = "Edit Project";
    this.buttonText = "Update";
    this.projectService.getProjectById(id).subscribe(result => {

      this.Project = result;

      this.projectForm.patchValue({
        ProjectDescription: this.Project.ProjectDescription,
        Manager: this.Project.ManagerName,
        Priority: this.Project.Priority,
        StartDate: this.Project.StartDate,
        EndDate: this.Project.EndDate
      });

      this.projectForm.patchValue({
        DateRequired: this.Project.StartDate != null
      });

      this.managerId = this.Project.ManagerId;

      this.toggleDate();
    });
  }

  suspendProject(id: number) {

    this.messageDialog = this.dialog.open(MessagedialogComponent, {
      data: { message: "Are you sure to suspend the project?" },
      height: "250px",
      width: "400px",
    });

    this.messageDialog.afterClosed().subscribe((response: string) => {
      if (response == "OK") {

        // suspend the project on confirmation
        this.projectService.suspendProject(id).subscribe(result => {

          if (result) {
            // reload the table
            this.getProjects();
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

  onSubmit() {
    this.submitted = true;
    this.startDateRequired = false;
    this.endDateRequired = false;

    if (this.projectForm.invalid) {
      return;
    }

    this.Project.ProjectDescription = this.projectForm.get('ProjectDescription').value;
    this.Project.ManagerId = this.managerId;
    this.Project.Priority = this.projectForm.get('Priority').value;

    let dateRequired = this.projectForm.controls['DateRequired'].value;

    if (dateRequired) {

      let startDate = this.projectForm.get('StartDate').value
      let endDate = this.projectForm.get('EndDate').value

      if (startDate == null || startDate == undefined || startDate == "") {
        this.startDateRequired = true;
      }

      if (endDate == null || endDate == undefined || endDate == "") {
        this.endDateRequired = true;
      }

      if (this.startDateRequired || this.endDateRequired) {
        return;
      }

      if (startDate > endDate) {
        this.startDateGreater = true;
        return;
      }

      this.Project.StartDate = this.projectForm.get('StartDate').value;
      this.Project.EndDate = this.projectForm.get('EndDate').value;
    }
    else {
      this.Project.StartDate = null;
      this.Project.EndDate = null;
    }

    this.projectService.saveProject(this.Project).subscribe(result => {

      if (result > 0) {
        // reload the table
        this.getProjects();
        this.resetForm();
      }
      else {
        this.error = "Error while saving the task";
      }
    }, error => {
      this.error = "Error while saving the task";
    });

    return;
  }

  sortBy(field: string) {
    this.field = field;
    this.order = this.order * (-1);
    return false;
  }
}
