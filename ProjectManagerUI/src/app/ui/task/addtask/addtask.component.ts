import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskModule } from 'src/app/model/task/task.module';
import { UserdialogComponent } from '../../shared/userdialog/userdialog.component';
import { MessagedialogComponent } from '../../shared/messagedialog/messagedialog.component';
import { formatDate } from '@angular/common';
import { UserModule } from 'src/app/model/user/user.module';
import { ProjectdialogComponent } from '../../shared/projectdialog/projectdialog.component';
import { ParenttaskdialogComponent } from '../../shared/parenttaskdialog/parenttaskdialog.component';
import { ProjectModule } from 'src/app/model/project/project.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css'],
  preserveWhitespaces: true
})
export class AddtaskComponent implements OnInit {

  constructor(private taskService: TaskService,
    private dialog: MatDialog,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  isEdit: boolean;
  title: string;
  buttonText: string;
  Task: TaskModule;
  taskForm: FormGroup;
  submitted: boolean = false;
  status: boolean;
  error: string;

  userDialog: MatDialogRef<UserdialogComponent>;
  messageDialog: MatDialogRef<MessagedialogComponent>;
  projectDialog: MatDialogRef<ProjectdialogComponent>;
  taskDialog: MatDialogRef<ParenttaskdialogComponent>;

  projectId: number;
  parentTaskId: number;
  userId: number;

  startDateRequired: boolean;
  endDateRequired: boolean;
  startDateGreater: boolean;
  userRequrired: boolean;
  priorityRequired: boolean;
  userRequired: boolean;

  ngOnInit() {
    this.initializeFormControl();

    this.isEdit = false;

    // for edit
    this.activatedRoute.params.subscribe(params => {
      if (params != null) {
        let taskId = params['id'];

        if (taskId != null && taskId != undefined) {
          this.Task.TaskId = taskId;
          this.editTask(this.Task.TaskId);
        }
      }
    })
  }

  initializeFormControl() {

    this.Task = new TaskModule();

    // new object
    this.taskForm = new FormGroup({
      Project: new FormControl('', Validators.required),
      Task: new FormControl('', Validators.required),
      IsParentTask: new FormControl(false),
      ParentTask: new FormControl({ value: null, disable: true }),
      Priority: new FormControl({ value: 0, disable: true }),
      StartDate: new FormControl({ value: null, disable: true }),
      EndDate: new FormControl({ value: null, disable: true }),
      User: new FormControl({ value: null, disable: true }),
    });

    this.addProject();
    this.onParentTaskChange();
  }

  get f() {
    return this.taskForm.controls;
  }

  onParentTaskChange() {

    this.startDateRequired = false;
    this.endDateRequired = false;
    this.startDateGreater = false;

    let isParentTask = this.taskForm.controls['IsParentTask'].value;

    if (!isParentTask) {
      let today = new Date();
      let todayplus1 = new Date();
      todayplus1.setDate(today.getDate() + 1);

      this.taskForm.patchValue({
        StartDate: formatDate(today, 'yyyy-MM-dd', 'en-US'),
        EndDate: formatDate(todayplus1, 'yyyy-MM-dd', 'en-US')
      })

      this.taskForm.controls['StartDate'].enable();
      this.taskForm.controls['EndDate'].enable();
      this.taskForm.controls['Priority'].enable();
      this.taskForm.controls['ParentTask'].enable();
      this.taskForm.controls['User'].enable();
    }
    else {
      this.taskForm.patchValue({
        StartDate: new FormControl({ value: null }),
        EndDate: new FormControl({ value: null }),
        ParentTask: '',
        Priority: 0,
        User: '',
      })

      this.userId = 0;
      this.parentTaskId = 0;

      this.taskForm.controls['StartDate'].disable();
      this.taskForm.controls['EndDate'].disable();
      this.taskForm.controls['Priority'].disable();
      this.taskForm.controls['ParentTask'].enable();
      this.taskForm.controls['User'].disable();
    }
  }

  openProjectDialog() {

    if (!this.isEdit) {
      this.projectDialog = this.dialog.open(ProjectdialogComponent, {
        height: "400px", width: "600px"
      });

      this.projectDialog.afterClosed().subscribe((proj: ProjectModule) => {
        if (proj != null) {
          this.taskForm.patchValue({
            Project: proj.ProjectDescription
          })
          this.projectId = proj.ProjectId;
        }
      });
    }
  }

  openUserDialog() {

    let isParentTask = this.taskForm.controls['IsParentTask'].value;

    if (!isParentTask) {
      this.userDialog = this.dialog.open(UserdialogComponent, {
        height: "400px", width: "600px"
      });

      this.userDialog.afterClosed().subscribe((user: UserModule) => {
        if (user != null) {
          this.taskForm.patchValue({
            User: user.LastName + ", " + user.FirstName
          })
          this.userId = user.UserId;
        }
      });
    }
  }

  openParentTaskDialog() {

    let isParentTask = this.taskForm.controls['IsParentTask'].value;

    if (!isParentTask) {
      this.taskDialog = this.dialog.open(ParenttaskdialogComponent, {
        height: "400px", width: "600px"
      });

      this.taskDialog.afterClosed().subscribe((pTask: TaskModule) => {
        if (pTask != null) {
          this.taskForm.patchValue({
            ParentTask: pTask.TaskDescription
          })
          this.parentTaskId = pTask.TaskId;
        }
      });
    }
  }

  resetForm() {
    this.Task = new TaskModule();
    this.projectId = 0;
    this.parentTaskId = null;
    this.userId = 0;
    this.startDateRequired = false;
    this.endDateRequired = false;
    this.startDateGreater = false;
    this.userRequrired = false;
    this.taskForm.patchValue({
      Project: '',
      Task: '',
      IsParentTask: false,
      ParentTask: '',
      Priority: 0,
      StartDate: null,
      EndDate: null,
      User: ''
    });
  }

  cancel() {
    this.resetForm();
    this.route.navigate(['/task']);
  }

  addProject() {
    this.resetForm();
    this.title = "Add Task";
    this.buttonText = "Add";
    this.onParentTaskChange();
  }

  editTask(id: number) {

    this.title = "Edit Task";
    this.isEdit = true;
    this.buttonText = "Update";

    this.taskService.getTaskById(id).subscribe(result => {

      this.Task = result;

      this.taskForm.patchValue({
        Project: this.Task.ProjectDescription,
        Task: this.Task.TaskDescription,
        IsParentTask: this.Task.IsParentTask,
        ParentTask: this.Task.ParentTaskDescription,
        Priority: this.Task.Priority,
        StartDate: this.Task.StartDate,
        EndDate: this.Task.EndDate,
        User: this.Task.UserName
      });

      this.projectId = this.Task.ProjectId;
      this.parentTaskId = this.Task.ParentTaskId;
      this.userId = this.Task.UserId;

      this.onParentTaskChange();

      // on edit mode, not allow to change the parent flag
      let isParentTask = this.taskForm.controls['IsParentTask'].value
      if (isParentTask) {
        this.taskForm.controls['IsParentTask'].disable();
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.startDateRequired = false;
    this.endDateRequired = false;
    this.priorityRequired = false;
    this.startDateGreater = false;
    this.userRequired = false;

    if (this.taskForm.invalid) {
      return;
    }

    let isParentTask = this.taskForm.controls['IsParentTask'].value;

    this.Task.ProjectDescription = this.taskForm.get('Project').value;
    this.Task.ProjectId = this.projectId;
    this.Task.TaskDescription = this.taskForm.get('Task').value;
    this.Task.IsParentTask = isParentTask;

    if (!isParentTask) {

      let startDate = this.taskForm.get('StartDate').value
      let endDate = this.taskForm.get('EndDate').value
      let priority = this.taskForm.get('Priority').value
      let user = this.taskForm.get('User').value

      if (startDate == null || startDate == undefined || startDate == "") {
        this.startDateRequired = true;
      }

      if (endDate == null || endDate == undefined || endDate == "") {
        this.endDateRequired = true;
      }

      if (priority == null || priority == undefined || priority == "" || priority == 0) {
        this.priorityRequired = true;
      }

      if (user == null || user == undefined || user == "") {
        this.userRequired = true;
      }

      if (this.startDateRequired || this.endDateRequired
        || this.priorityRequired || this.userRequired) {
        return;
      }

      if (startDate > endDate) {
        this.startDateGreater = true;
        return;
      }

      this.Task.StartDate = this.taskForm.get('StartDate').value;
      this.Task.EndDate = this.taskForm.get('EndDate').value;
      this.Task.Priority = this.taskForm.get('Priority').value;
      this.Task.UserName = this.taskForm.get('User').value;;

      this.Task.UserId = this.userId;
      this.Task.ParentTaskId = this.parentTaskId;
    }
    else {
      this.Task.StartDate = null;
      this.Task.EndDate = null;
      this.Task.Priority = null;
      this.Task.ParentTaskId = null;
      this.Task.UserId = null;
    }

    this.taskService.saveTask(this.Task).subscribe(result => {

      if (result > 0) {
        this.route.navigate(['/task']);
      }
      else {
        this.error = "Error while saving the task";
      }
    }, error => {
      this.error = "Error while saving the task";
    });

    return;
  }
}
