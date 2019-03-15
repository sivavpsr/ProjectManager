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
    public class TC02_ProjectTest
    {
        string baseUri = ConfigurationManager.AppSettings["BaseURI"];
        int projectId = 0;
        string projectDescription = "NUnit " + DateTime.Now.ToString("yyyyMMddHHmmss");

        [Test]
        public void T201_GetProjects()
        {
            var items = GetProjects();
            Assert.Greater(items.Count, 0);
        }

        [Test]
        public void T202_AddProjectWithoutDate()
        {
            ProjectModel model = new ProjectModel();
            model.ProjectDescription = projectDescription;
            model.ManagerId = GlobalConstants.USER_ID;

            projectId = Save(model);

            var item = GetProjectById(projectId);
            Assert.AreEqual(item.ProjectId, projectId);
        }

        [Test]
        public void T203_UpdateProject()
        {
            ProjectModel model = new ProjectModel();
            model.ProjectDescription = projectDescription + " updated";
            model.Priority = 10;
            model.StartDate = DateTime.Today;
            model.EndDate = DateTime.Today.AddDays(5);
            model.ManagerId = GlobalConstants.USER_ID;

            projectId = Save(model);

            var item = GetProjectById(projectId);
            Assert.AreEqual(item.ProjectId, projectId);
        }
        
        [Test]
        public void T204_GetProjectById()
        {
            var item = GetProjectById(projectId);
            Assert.AreEqual(item.ProjectId, projectId);
        }

        [Test]
        public void T205_SuspendProject()
        {
            SuspendProject(projectId);

            var item = GetProjectById(projectId);

            Assert.AreEqual(null, item);
        }

        [Test]
        public void T206_AddProjectWithDates()
        {
            ProjectModel model = new ProjectModel();
            model.ProjectDescription = projectDescription;
            model.ManagerId = GlobalConstants.USER_ID;
            model.Priority = 10;
            model.StartDate = DateTime.Today;
            model.EndDate = DateTime.Today.AddDays(5);            

            projectId = Save(model);

            var item = GetProjectById(projectId);
            Assert.AreEqual(item.ProjectId, projectId);

            GlobalConstants.PROJECT_ID = projectId;
        }

        private List<ProjectModel> GetProjects()
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUri);

            var response = client.GetAsync("/api/project/getprojects").Result;
            var projects = response.Content.ReadAsAsync<List<ProjectModel>>().Result;
            return projects;
        }

        private ProjectModel GetProjectById(int id)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUri);

            var response = client.GetAsync("/api/project/getprojectbyid/" + id.ToString()).Result;
            var project = response.Content.ReadAsAsync<ProjectModel>().Result;
            return project;
        }

        private int Save(ProjectModel model)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUri);

            var response = client.PostAsJsonAsync<ProjectModel>("/api/project/save", model).Result;
            var id = response.Content.ReadAsAsync<int>().Result;
            return id;
        }

        private void SuspendProject(int id)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUri);

            ProjectModel model = new ProjectModel();
            model.ProjectId = id;
            var response = client.PostAsJsonAsync<ProjectModel>("/api/project/suspend", model).Result;
            response.EnsureSuccessStatusCode();
        }
    }
}
