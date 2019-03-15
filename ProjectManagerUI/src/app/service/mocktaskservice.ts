import { Injectable } from '@angular/core';
import { observable, of, Observable, throwError } from 'rxjs';
import { TaskModule } from '../model/task/task.module';
import { TaskService } from './task.service';

@Injectable({
    providedIn: 'root'
})

export class MockTaskService extends TaskService {

    mockTasks: TaskModule[] = [
        {
            TaskId: 1,
            TaskDescription: "Task 1",
            ProjectId: 1,
            ProjectDescription: "Project 1",
            IsParentTask: false,
            ParentTaskId: 0,
            ParentTaskDescription: "",
            Priority: 10,
            StartDate: new Date(2018, 12, 27),
            EndDate: new Date(2018, 12, 28),
            UserId: 1,
            UserName: "User 1",
            Completed: false
        },
        {
            TaskId: 2,
            TaskDescription: "Task 2",
            ProjectId: 1,
            ProjectDescription: "Project 1",
            IsParentTask: false,
            ParentTaskId: 0,
            ParentTaskDescription: "",
            Priority: 10,
            StartDate: new Date(2018, 12, 27),
            EndDate: new Date(2018, 12, 28),
            UserId: 1,
            UserName: "User 1",
            Completed: false
        }
    ]

    // get all the tasks
    getAllTasks(): Observable<TaskModule[]> {
        return of(this.mockTasks);
    }

    getTasksByProjectId(projectId): Observable<TaskModule[]> {
        let projTasks = this.mockTasks.filter(t => t.ProjectId == projectId);
        return of(projTasks);
    }

    getParentTasks(): Observable<TaskModule[]> {
        let parentTasks: TaskModule[] = this.mockTasks.filter(t => t.IsParentTask);
        return of(parentTasks);
    }

    // get the task details by id
    getTaskById(id): Observable<TaskModule> {
        let task: TaskModule = this.mockTasks.find(t => t.TaskId == id);
        return of(task);
    }

    // save the task (add, edit)
    saveTask(task: TaskModule): Observable<number> {
        let taskIndex = this.mockTasks.findIndex(t => t.TaskId == task.TaskId);

        if (taskIndex < 0) {
            this.mockTasks.push(task);
        }
        else {
            this.mockTasks[taskIndex] = task;
        }

        return of(task.TaskId);
    }

    // complete the task for the given id
    completeTask(id): Observable<boolean> {

        let taskIndex = this.mockTasks.findIndex(t => t.TaskId == id);

        if (taskIndex < 0) {
            throwError("Task not found");
        }
        else {
            this.mockTasks[taskIndex].Completed = true;
        }

        return of(true);
    }
}
