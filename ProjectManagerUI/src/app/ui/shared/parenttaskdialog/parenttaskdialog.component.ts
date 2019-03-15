import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { MatDialogRef } from '@angular/material';
import { TaskModule } from 'src/app/model/task/task.module';

@Component({
  selector: 'app-parenttaskdialog',
  templateUrl: './parenttaskdialog.component.html',
  styleUrls: ['./parenttaskdialog.component.css']
})
export class ParenttaskdialogComponent implements OnInit {

  constructor(private taskService: TaskService,
    private dialogRef: MatDialogRef<ParenttaskdialogComponent>) { }

  ParentTasks: TaskModule[];
  searchText: string;

  ngOnInit() {
    this.getParentTasks();
  }

  getParentTasks() {
    this.taskService.getParentTasks().subscribe(result => { this.ParentTasks = result });
  }

  selectTask(tsk: TaskModule){
    this.dialogRef.close(tsk);
  }

}
