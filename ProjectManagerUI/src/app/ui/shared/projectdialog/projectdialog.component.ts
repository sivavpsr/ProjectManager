import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { MatDialogRef } from '@angular/material';
import { ProjectModule } from 'src/app/model/project/project.module';

@Component({
  selector: 'app-projectdialog',
  templateUrl: './projectdialog.component.html',
  styleUrls: ['./projectdialog.component.css']
})
export class ProjectdialogComponent implements OnInit {

  Projects: ProjectModule[];
  public searchText: string;

  constructor(private projectService: ProjectService,
    private dialogRef: MatDialogRef<ProjectdialogComponent>) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjectsForSearch().subscribe(result => { this.Projects = result });
  }

  selectProject(project: ProjectModule){
    this.dialogRef.close(project);
  }
}
