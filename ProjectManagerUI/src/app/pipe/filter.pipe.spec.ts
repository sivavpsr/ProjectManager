import { FilterPipe } from './filter.pipe';
import { ProjectModule } from '../model/project/project.module';

describe('FilterPipe', () => {

  let filterPipe = new FilterPipe();

  let projectProperties: string[] = ["ProjectDescription"];
  let mockProjects: ProjectModule[] = [
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

  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('filer project by project description', () => {
    const pipe = new FilterPipe();
    let searchText = "Project 1"
    let expectedResult = [
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
      }
    ];

    expect(pipe.transform(mockProjects, searchText, projectProperties)).toEqual(expectedResult);
  });

  it('filer project by manager first name', () => {
    const pipe = new FilterPipe();
    let searchText = "First 1"
    let expectedResult = [];

    expect(pipe.transform(mockProjects, searchText, projectProperties)).toEqual(expectedResult);
  });
});
