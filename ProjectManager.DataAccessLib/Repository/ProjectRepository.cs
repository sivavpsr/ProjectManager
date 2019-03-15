using System.Collections.Generic;
using System.Linq;

namespace ProjectManager.DataAccessLib.Repository
{
    using ProjectManager.DataAccessLib.Interface;
    using ProjectManager.Entity.Data;
    using ProjectManager.Entity.Interface;
    using ProjectManager.Entity.Context;
    using ProjectManager.Model;

    public class ProjectRepository : IProjectRepository
    {
        UnitOfWork _unitOfWork;

        public ProjectRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork as UnitOfWork;
        }

        public List<ProjectModel> GetProjects()
        {
            List<ProjectModel> projects = (from prj in _unitOfWork.Project

                                           where prj.Active

                                           select new ProjectModel
                                           {
                                               ProjectId = prj.ProjectId,
                                               ProjectDescription = prj.ProjectDescription,
                                               ManagerId = prj.ManagerId,
                                               ManagerFirstName = prj.Manager.FirstName,
                                               ManagerLastName = prj.Manager.LastName,
                                               StartDate = prj.StartDate,
                                               EndDate = prj.EndDate,
                                               Priority = prj.Priority,

                                               Tasks = _unitOfWork.Task.Where(t => t.ProjectId == prj.ProjectId && t.Active).Select(t => new TaskModel
                                               {
                                                   TaskId = t.TaskId,
                                                   Completed = t.Completed
                                               }).ToList()

                                           }).ToList();

            return projects;
        }

        public List<ProjectModel> GetProjectsForSearch()
        {
            List<ProjectModel> projects = (from prj in _unitOfWork.Project

                                           where prj.Active

                                           select new ProjectModel
                                           {
                                               ProjectId = prj.ProjectId,
                                               ProjectDescription = prj.ProjectDescription,
                                           }).ToList();

            return projects;
        }

        public ProjectModel GetProjectById(int id)
        {
            ProjectModel project = (from prj in _unitOfWork.Project

                                    where prj.ProjectId == id

                                    && prj.Active

                                    select new ProjectModel
                                    {
                                        ProjectId = prj.ProjectId,
                                        ProjectDescription = prj.ProjectDescription,
                                        ManagerId = prj.ManagerId,
                                        ManagerFirstName = prj.Manager.FirstName,
                                        ManagerLastName = prj.Manager.LastName,
                                        StartDate = prj.StartDate,
                                        EndDate = prj.EndDate,
                                        Priority = prj.Priority                                        
                                    }).FirstOrDefault();

            return project;
        }

        public int Save(ProjectModel model)
        {
            Project project = null;

            project = _unitOfWork.Project.FirstOrDefault(prj => prj.ProjectId == model.ProjectId);

            if (project == null)
            {
                project = new Project();
                _unitOfWork.Project.Add(project);
            }
            else
            {
                _unitOfWork.Project.Attach(project);
                _unitOfWork.Entry<Project>(project).State = System.Data.Entity.EntityState.Modified;                
            }

            project.ProjectDescription = model.ProjectDescription;
            project.ManagerId = model.ManagerId;
            project.Priority = model.Priority;
            project.StartDate = model.StartDate;
            project.EndDate = model.EndDate;
            project.Active = true;

            // save the project entity
            _unitOfWork.SaveChanges();

            return project.ProjectId;
        }

        public bool Delete(int id)
        {
            Project project = _unitOfWork.Project.FirstOrDefault(prj => prj.ProjectId == id);
            _unitOfWork.Project.Remove(project);
            _unitOfWork.SaveChanges();

            return true;
        }

        public bool Suspend(int id)
        {
            Project project = _unitOfWork.Project.FirstOrDefault(prj => prj.ProjectId == id);
            project.Active = false;

            _unitOfWork.SaveChanges();

            return true;
        }
    }
}
