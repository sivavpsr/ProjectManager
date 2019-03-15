import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProjectModule } from '../model/project/project.module';
import { ProjectService } from './project.service';

@Injectable({
    providedIn: 'root'
})
export class MockProjectService extends ProjectService {

    mockProjects: ProjectModule[] = [
        {
            ProjectId: 1,
            ProjectDescription: "Project 1",
            ManagerId: 1,
            ManagerFirstName: "First 1",
            ManagerLastName: "Last 1",
            ManagerName: "Last 1, First 1",
            StartDate: new Date("2018-12-27"),
            EndDate: new Date("2018-12-28"),
            Priority: 6,
            TaskCount: 10,
            CompletedTaskCount: 2
        },
        {
            ProjectId: 2,
            ProjectDescription: "Project 2",
            ManagerId: 2,
            ManagerFirstName: "First 2",
            ManagerLastName: "Last 2",
            ManagerName: "Last 2, First 2",
            StartDate: new Date(2018, 12, 27),
            EndDate: new Date(2018, 12, 28),
            Priority: 8,
            TaskCount: 10,
            CompletedTaskCount: 5
        },
    ]

    // get all projects
    getProjects(): Observable<ProjectModule[]> {
        return of(this.mockProjects);
    }

    // get all projects
    getProjectsForSearch(): Observable<ProjectModule[]> {
        return of(this.mockProjects);
    }

    // get project by id    
    getProjectById(id: number): Observable<ProjectModule> {
        let proj = this.mockProjects.find(p => p.ProjectId == id);
        return of(proj);
    }

    // add & update Project
    saveProject(proj: ProjectModule): Observable<number> {
        let index = this.mockProjects.findIndex(t => t.ProjectId == proj.ProjectId);

        if (index < 0) {
            this.mockProjects.push(proj);
        }
        else {
            this.mockProjects[index] = proj;
        }

        return of(proj.ProjectId);
    }

    // suspend Project
    suspendProject(id: number): Observable<boolean> {
        let index = this.mockProjects.findIndex(t => t.ProjectId == id);

        if (index < 0) {
            throwError("No project found")
        }
        else {
            this.mockProjects.slice(index, 1);
        }

        return of(true);
    }
}
