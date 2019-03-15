import { OrderbyPipe } from './orderby.pipe';
import { ProjectModule } from '../model/project/project.module';

describe('OrderbyPipe', () => {

  let orderByPipe = new OrderbyPipe();

  let orderField: string = "ProjectDescription";

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
    const pipe = new OrderbyPipe();
    expect(pipe).toBeTruthy();
  });

  it('sort by ascending', () => {
    const pipe = new OrderbyPipe();
    let result = pipe.transform(mockProjects, orderField, 1);
    expect(result[0].ProjectDescription).toEqual("Project 1");
  });

  it('sort by descending', () => {
    const pipe = new OrderbyPipe();
    let result = pipe.transform(mockProjects, orderField, -1);
    expect(result[0].ProjectDescription).toEqual("Project 2");
  });
});
