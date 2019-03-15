import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class ProjectModule {
  public ProjectId: number;
  public ProjectDescription: string;
  public ManagerId: number;
  public ManagerFirstName: string;
  public ManagerLastName: string;
  public ManagerName: string;
  public StartDate: Date;
  public EndDate: Date;
  public Priority: number;  
  public TaskCount: number;
  public CompletedTaskCount: number;
}
