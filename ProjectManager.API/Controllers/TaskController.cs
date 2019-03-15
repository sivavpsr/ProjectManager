using System.Collections.Generic;
using System.Web.Http;

namespace ProjectManager.API.Controllers
{
    using ProjectManager.Model;
    using ProjectManager.BusinessLib.Interface;

    [RoutePrefix("api/task")]
    public class TaskController : ApiController
    {
        ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [Route("gettasks")]
        // GET: api/projects
        public List<TaskModel> GetTasks()
        {
            return _taskService.GetTasks();
        }

        [Route("gettasksbyprojectid")]
        // GET: api/projects
        public List<TaskModel> GetTasksByProjectId(int id)
        {
            return _taskService.GetTasksByProject(id);
        }

        [Route("getparenttasks")]
        // GET: api/projects
        public List<TaskModel> GetParentTasks()
        {
            return _taskService.GetParentTasks();
        }

        [Route("gettaskbyid")]
        // GET: api/project/5
        public TaskModel GetTaskById(int id)
        {
            return _taskService.GetTaskById(id);
        }

        [Route("save")]
        // POST: api/project
        public int Save(TaskModel model)
        {
            return _taskService.Save(model);
        }

        [Route("delete")]
        // DELETE: api/project/5
        public bool Delete(int id)
        {
            return _taskService.Delete(id);
        }

        [Route("complete")]
        public bool Complete(TaskModel model)
        {
            return _taskService.Complete(model.TaskId);
        }
    }
}
