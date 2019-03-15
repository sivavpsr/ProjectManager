import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { ProjectService } from './project.service';
import { MockProjectService } from './mockprojectservice';
import { ProjectModule } from '../model/project/project.module';

describe('ProjectService', () => {

  let service: ProjectService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: ProjectService, useClass: MockProjectService }
      ]
    });

    service = TestBed.get(ProjectService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('#getprojects', () => {
    let projects: ProjectModule[];
    service.getProjects().subscribe(result => { projects = result });
    expect(projects.length).toBeGreaterThanOrEqual(0);
  });  

  it('#getprojectbyid', () => {
    let proj: ProjectModule;
    const projectId = 1;
    service.getProjectById(projectId).subscribe(result => { proj = result });
    expect(proj.ProjectId).toBe(projectId);
  }); 

  it('#addProject', () => {
    let proj: ProjectModule;
    let response: number;

    proj = { 
      ProjectId: 3, 
      ProjectDescription: "Project 3", 
      ManagerId: 3,
      ManagerFirstName: "First 3",
      ManagerLastName: "Last 3",
      ManagerName: "Last 3, First 3",
      StartDate: new Date(2018, 12, 27),
      EndDate: new Date(2018, 12, 28),
      Priority: 7,
      TaskCount: 10,
      CompletedTaskCount: 6
    };

    service.saveProject(proj).subscribe(result => {  response = result });
    expect(response).toBe(proj.ProjectId);
  }); 

  it('#updateProject', () => {
    let proj: ProjectModule;
    let response: number;

    proj = { 
      ProjectId: 3, 
      ProjectDescription: "Project 3 Updated", 
      ManagerId: 3,
      ManagerFirstName: "First 3",
      ManagerLastName: "Last 3",
      ManagerName: "Last 3, First 3",
      StartDate: new Date(2018, 12, 27),
      EndDate: new Date(2018, 12, 28),
      Priority: 7,
      TaskCount: 10,
      CompletedTaskCount: 6
    };

    service.saveProject(proj).subscribe(result => {  response = result });
    expect(response).toBe(proj.ProjectId);
  }); 

  it('#suspendProject', () => {    
    let response: boolean;
    const projectId = 3;
    service.suspendProject(projectId).subscribe(result => {  response = result });
    expect(response).toBe(true);
  }); 
});
