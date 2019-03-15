using System.Collections.Generic;
using System.Linq;

namespace ProjectManager.DataAccessLib.Repository
{
    using ProjectManager.DataAccessLib.Interface;
    using ProjectManager.Entity.Data;
    using ProjectManager.Entity.Interface;
    using ProjectManager.Entity.Context;
    using ProjectManager.Model;

    public class TaskRepository : ITaskRepository
    {
        UnitOfWork _unitOfWork;

        public TaskRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork as UnitOfWork;
        }

        public List<TaskModel> GetTasks()
        {
            List<TaskModel> projects = (from tsk in _unitOfWork.Task

                                        where tsk.Active

                                        select new TaskModel
                                        {
                                            TaskId = tsk.TaskId,
                                            TaskDescription = tsk.TaskDescription,

                                            ParentTaskId = tsk.ParentTaskId,
                                            ParentTaskDescription = tsk.ParentTask == null ? string.Empty : tsk.ParentTask.TaskDescription,

                                            ProjectId = tsk.ProjectId,
                                            ProjectDescription = tsk.Project == null ? string.Empty : tsk.Project.ProjectDescription,

                                            StartDate = tsk.StartDate,
                                            EndDate = tsk.EndDate,
                                            Priority = tsk.Priority,
                                            Completed = tsk.Completed
                                        }).ToList();

            return projects;
        }

        public List<TaskModel> GetTasksByProject(int projectId)
        {
            List<TaskModel> projects = (from tsk in _unitOfWork.Task

                                        where tsk.Active

                                        && tsk.ProjectId == projectId

                                        select new TaskModel
                                        {
                                            TaskId = tsk.TaskId,
                                            TaskDescription = tsk.TaskDescription,

                                            ParentTaskId = tsk.ParentTaskId,
                                            ParentTaskDescription = tsk.ParentTask == null ? string.Empty : tsk.ParentTask.TaskDescription,

                                            ProjectId = tsk.ProjectId,
                                            ProjectDescription = tsk.Project == null ? string.Empty : tsk.Project.ProjectDescription,

                                            StartDate = tsk.StartDate,
                                            EndDate = tsk.EndDate,
                                            Priority = tsk.Priority,
                                            Completed = tsk.Completed
                                        }).ToList();

            return projects;
        }

        public List<TaskModel> GetParentTasks()
        {
            List<TaskModel> projects = (from tsk in _unitOfWork.Task

                                        where tsk.Active

                                        && tsk.IsParentTask

                                        select new TaskModel
                                        {
                                            TaskId = tsk.TaskId,
                                            TaskDescription = tsk.TaskDescription,
                                        }).ToList();

            return projects;
        }

        public TaskModel GetTaskById(int id)
        {
            TaskModel task = (from tsk in _unitOfWork.Task

                              where tsk.TaskId == id

                              && tsk.Active

                              select new TaskModel
                              {
                                  TaskId = tsk.TaskId,
                                  TaskDescription = tsk.TaskDescription,

                                  IsParentTask = tsk.IsParentTask,

                                  ParentTaskId = tsk.ParentTaskId,
                                  ParentTaskDescription = tsk.ParentTask == null ? string.Empty : tsk.ParentTask.TaskDescription,

                                  ProjectId = tsk.ProjectId,
                                  ProjectDescription = tsk.Project == null ? string.Empty : tsk.Project.ProjectDescription,

                                  UserId = tsk.UserId,
                                  UserFirstName = tsk.User == null ? string.Empty : tsk.User.FirstName,
                                  UserLastName = tsk.User == null ? string.Empty : tsk.User.LastName,

                                  StartDate = tsk.StartDate,
                                  EndDate = tsk.EndDate,
                                  Priority = tsk.Priority,
                                  Completed = tsk.Completed
                              }).FirstOrDefault();

            return task;
        }

        public int Save(TaskModel model)
        {
            Task task = null;

            task = _unitOfWork.Task.FirstOrDefault(tsk => tsk.TaskId == model.TaskId);

            if (task == null)
            {
                task = new Task();
                _unitOfWork.Task.Add(task);
            }
            else
            {
                _unitOfWork.Task.Attach(task);
                _unitOfWork.Entry<Task>(task).State = System.Data.Entity.EntityState.Modified;                
            }

            task.TaskDescription = model.TaskDescription;
            task.ProjectId = model.ProjectId;
            task.ParentTaskId = model.ParentTaskId == 0 ? null : model.ParentTaskId;

            task.UserId= model.UserId;
            task.IsParentTask = model.IsParentTask;
            task.Priority = model.Priority;
            task.StartDate = model.StartDate;
            task.EndDate = model.EndDate;
            task.Active = true;
            task.Completed = false;

            // save the project entity
            _unitOfWork.SaveChanges();

            return task.TaskId;
        }

        public bool Delete(int id)
        {
            Task task = _unitOfWork.Task.FirstOrDefault(tsk => tsk.TaskId == id);
            task.Active = false;
            
            _unitOfWork.SaveChanges();

            return true;
        }

        public bool Complete(int id)
        {
            Task task = _unitOfWork.Task.FirstOrDefault(tsk => tsk.TaskId == id);
            task.Completed = true;

            _unitOfWork.SaveChanges();

            return true;
        }
    }
}
