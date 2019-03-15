using System.Collections.Generic;

namespace ProjectManager.BusinessLib.Service
{
    using ProjectManager.BusinessLib.Interface;
    using ProjectManager.Model;
    using ProjectManager.DataAccessLib.Interface;

    public class TaskService : ITaskService
    {
        ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public List<TaskModel> GetTasks()
        {
            return _taskRepository.GetTasks();
        }

        public List<TaskModel> GetTasksByProject(int projectId)
        {
            return _taskRepository.GetTasksByProject(projectId);
        }

        public List<TaskModel> GetParentTasks()
        {
            return _taskRepository.GetParentTasks();
        }

        public TaskModel GetTaskById(int id)
        {
            return _taskRepository.GetTaskById(id);
        }

        public int Save(TaskModel model)
        {
            return _taskRepository.Save(model);
        } 

        public bool Delete(int id)
        {
            return _taskRepository.Delete(id);
        }

        public bool Complete(int id)
        {
            return _taskRepository.Complete(id);
        }
    }
}
