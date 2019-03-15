using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using NUnit.Framework;

namespace ProjectManager.UnitTest
{
    using ProjectManager.Model;

    [TestFixture]
    public class TC03_TaskTest
    {
        string baseUri = ConfigurationManager.AppSettings["BaseURI"];
        int taskId = 0;
        int parentTaskId = 0;
        string taskDescription = "NUnit " + DateTime.Now.ToString("yyyyMMddHHmmss");

        [Test]
        public void T301_AddTaskWithoutParent()
        {
            TaskModel model = new TaskModel();
            model.TaskDescription = taskDescription;
            model.ProjectId = GlobalConstants.PROJECT_ID;
            model.IsParentTask = false;
            model.Priority = 10;
            model.StartDate = DateTime.Today;
            model.EndDate = DateTime.Today.AddDays(5);
            model.UserId = GlobalConstants.USER_ID;

            taskId = Save(model);

            var item = GetTaskById(taskId);
            Assert.AreEqual(item.TaskId, taskId);
        }

        [Test]
        public void T302_AddParentTask()
        {
            TaskModel model = new TaskModel();
            model.TaskDescription = taskDescription;
            model.ProjectId = GlobalConstants.PROJECT_ID;
            model.IsParentTask = true;

            parentTaskId = Save(model);

            var item = GetTaskById(parentTaskId);
            Assert.AreEqual(item.TaskId, parentTaskId);
        }

        [Test]
        public void T303_GetTasksByProjectId()
        {
            var items = GetTasksByProjectId(GlobalConstants.PROJECT_ID);
            Assert.GreaterOrEqual(items.Count, 0);
        }

        [Test]
        public void T304_UpdateTask()
        {
            TaskModel model = new TaskModel();
            model.TaskId = taskId;
            model.TaskDescription = taskDescription + " updated";
            model.ProjectId = GlobalConstants.PROJECT_ID;
            model.Priority = 10;
            model.StartDate = DateTime.Today;
            model.EndDate = DateTime.Today.AddDays(5);
            model.UserId = GlobalConstants.USER_ID;
            taskId = Save(model);

            var item = GetTaskById(taskId);
            Assert.AreEqual(item.TaskId, taskId);
        }
        
        [Test]
        public void T305_GetTaskById()
        {
            var item = GetTaskById(taskId);
            Assert.AreEqual(item.TaskId, taskId);
        }

        [Test]
        public void T306_CompleteTask()
        {
            CompleteTask(taskId);

            var item = GetTaskById(taskId);

            Assert.AreEqual(
                new { id = taskId, state = true },
                new { id = item.TaskId, state = item.Completed }
                );
        }

        [Test]
        public void T307_AddTaskWithParent()
        {
            TaskModel model = new TaskModel();
            model.TaskDescription = taskDescription;
            model.ProjectId = GlobalConstants.PROJECT_ID;
            model.IsParentTask = false;
            model.ParentTaskId = parentTaskId;
            model.Priority = 10;
            model.StartDate = DateTime.Today;
            model.EndDate = DateTime.Today.AddDays(5);
            model.UserId = GlobalConstants.USER_ID;

            taskId = Save(model);

            var item = GetTaskById(taskId);
            Assert.AreEqual(item.TaskId, taskId);
        }

        private List<TaskModel> GetTasksByProjectId(int projectId)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUri);

            var response = client.GetAsync("/api/task/gettasksbyprojectid/" + projectId.ToString()).Result;
            var tasks = response.Content.ReadAsAsync<List<TaskModel>>().Result;
            return tasks;
        }

        private TaskModel GetTaskById(int id)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUri);

            var response = client.GetAsync("/api/task/gettaskbyid/" + id.ToString()).Result;
            var task = response.Content.ReadAsAsync<TaskModel>().Result;
            return task;
        }

        private int Save(TaskModel model)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUri);

            var response = client.PostAsJsonAsync<TaskModel>("/api/task/save", model).Result;
            var id = response.Content.ReadAsAsync<int>().Result;
            return id;
        }

        private bool CompleteTask(int id)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUri);

            TaskModel model = new TaskModel();
            model.TaskId = id;
            var response = client.PostAsJsonAsync<TaskModel>("/api/task/complete", model).Result;
            var status = response.Content.ReadAsAsync<bool>().Result;
            return status;
        }
    }
}
