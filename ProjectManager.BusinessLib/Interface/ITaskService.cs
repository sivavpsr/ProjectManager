using System.Collections.Generic;

namespace ProjectManager.BusinessLib.Interface
{
    using ProjectManager.Model;

    public interface ITaskService
    {
        List<TaskModel> GetTasks();

        List<TaskModel> GetTasksByProject(int projectId);

        List<TaskModel> GetParentTasks();

        TaskModel GetTaskById(int id);

        int Save(TaskModel model);

        bool Delete(int id);

        bool Complete(int id);        
    }
}
