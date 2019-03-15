import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class TaskModule {
  public TaskId: number;
  public TaskDescription: string;

  public ProjectId: number;
  public ProjectDescription: string;

  public IsParentTask: boolean;

  public ParentTaskId: number;
  public ParentTaskDescription: string;

  public UserId: number;
  public UserName: string;

  public StartDate: Date;
  public EndDate: Date;
  public Priority: number;
  public Completed: boolean;
  
}
