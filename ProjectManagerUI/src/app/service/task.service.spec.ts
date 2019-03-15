import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { TaskService } from './task.service';
import { MockTaskService } from './mocktaskservice';
import { TaskModule } from '../model/task/task.module';

describe('TaskService', () => {
  
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: TaskService, useClass: MockTaskService }
      ]
    });

    service = TestBed.get(TaskService);
  });

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });

  it('#gettasksbyprojectid', () => {
    let tasks: TaskModule[];
    const projectId = 1;
    service.getTasksByProjectId(projectId).subscribe(result => { tasks = result });
    expect(tasks.length).toBeGreaterThanOrEqual(0);
  });

  it('#gettaskbyid', () => {
    let task: TaskModule;
    const taskId = 1;
    service.getTaskById(taskId ).subscribe(result => { task = result });
    expect(task.TaskId).toBe(taskId);
  }); 

  it('#addTask', () => {
    let task: TaskModule;
    let response: number;

    task = { 
      TaskId: 3, 
      TaskDescription: "Task 3", 
      ProjectId: 1,
      ProjectDescription: "Project 1",
      IsParentTask: false,
      ParentTaskId: 0, 
      ParentTaskDescription: "", 
      StartDate: new Date(2018, 12, 27), 
      EndDate: new Date(2018, 12, 28),
      Priority: 15,
      UserId: 1,
      UserName: "User 1",
      Completed: false  
    };

    service.saveTask(task).subscribe(result => {  response = result });
    expect(response).toBe(task.TaskId);
  }); 

  it('#updateTask', () => {
    let task: TaskModule;
    let response: number;

    task = { 
      TaskId: 3, 
      TaskDescription: "Task 3 updated", 
      ProjectId: 1,
      ProjectDescription: "Project 1",
      IsParentTask: false,
      ParentTaskId: 0, 
      ParentTaskDescription: "", 
      StartDate: new Date(2018, 12, 27), 
      EndDate: new Date(2018, 12, 28),
      Priority: 15,
      UserId: 1,
      UserName: "User 1",
      Completed: false  
    };

    service.saveTask(task).subscribe(result => {  response = result });
    expect(response).toBe(task.TaskId);
  }); 

  it('#completeTask', () => {    
    let response: boolean;
    const taskId = 3;
    service.completeTask(taskId).subscribe(result => {  response = result });
    expect(response).toBe(true);
  }); 
});
