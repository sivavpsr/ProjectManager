import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskModule } from 'src/app/model/task/task.module';
import { UserdialogComponent } from '../../shared/userdialog/userdialog.component';
import { MessagedialogComponent } from '../../shared/messagedialog/messagedialog.component';
import { formatDate } from '@angular/common';
import { UserModule } from 'src/app/model/user/user.module';
import { Router } from '@angular/router';
import { ProjectdialogComponent } from '../../shared/projectdialog/projectdialog.component';
import { ProjectModule } from 'src/app/model/project/project.module';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  constructor(private taskService: TaskService,
    private dialog: MatDialog,
    private route: Router) { }

  Tasks: TaskModule[];
  error: string;

  projectDialog: MatDialogRef<ProjectdialogComponent>;
  messageDialog: MatDialogRef<MessagedialogComponent>;

  projectId: number;
  Project: string;

  searchText: string;
  field: string;
  order: number = 1;
  properties: string[] = null;

  ngOnInit() {
  }

  // get the Tasks
  getTasks() {
    this.taskService.getTasks().subscribe(result => this.Tasks = result);
  }

  openProjectDialog() {

    this.projectDialog = this.dialog.open(ProjectdialogComponent, {
      height: "400px", width: "600px"
    });

    this.projectDialog.afterClosed().subscribe((proj: ProjectModule) => {
      if (proj != null) {
        this.Project = proj.ProjectDescription;
        this.projectId = proj.ProjectId;

        this.taskService.getTasksByProjectId(this.projectId).subscribe(result =>
          this.Tasks = result, error => console.error(error));
      }
    });
  }

  resetForm() {
  }

  completeTask(id: number) {

    this.messageDialog = this.dialog.open(MessagedialogComponent, {
      data: { message: "Are you sure to complete the task ?" },
      height: "250px",
      width: "400px",
    });

    this.messageDialog.afterClosed().subscribe((response: string) => {

      if (response == "OK") {

        // complete the task 
        this.taskService.completeTask(id).subscribe(result => {

          if (result) {
            // reload the table
            this.getTasks();
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

  addTask() {
    this.route.navigate(['/addtask']);
  }

  editTask(id: number) {
    this.route.navigate(['/edittask/' + id]);
  }

  sortBy(field: string) {
    this.field = field;
    this.order = this.order * (-1);
    return false;
  }
}
