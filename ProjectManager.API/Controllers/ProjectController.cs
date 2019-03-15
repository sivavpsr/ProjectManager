using System.Collections.Generic;
using System.Web.Http;

namespace ProjectManager.API.Controllers
{
    using ProjectManager.Model;
    using ProjectManager.BusinessLib.Interface;

    [RoutePrefix("api/project")]
    public class ProjectController : ApiController
    {
        IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [Route("getprojects")]
        // GET: api/projects
        public List<ProjectModel> GetProjects()
        {
            return _projectService.GetProjects();
        }

        [Route("getprojectbyid")]
        // GET: api/project/5
        public ProjectModel GetProjectById(int id)
        {
            return _projectService.GetProjectById(id);
        }

        [Route("getprojectsforsearch")]
        // GET: api/project/5
        public List<ProjectModel> GetProjectsForSearch()
        {
            return _projectService.GetProjectsForSearch();
        }

        [Route("save")]
        // POST: api/project
        public int Save(ProjectModel model)
        {
            return _projectService.Save(model);
        }

        [Route("delete")]
        // DELETE: api/project/5
        public bool Delete(int id)
        {
            return _projectService.Delete(id);
        }

        [Route("suspend")]
        public bool Suspend(ProjectModel model)
        {
            return _projectService.Suspend(model.ProjectId);
        }
    }
}
