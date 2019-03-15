using System.Collections.Generic;

namespace ProjectManager.BusinessLib.Service
{
    using ProjectManager.BusinessLib.Interface;
    using ProjectManager.Model;
    using ProjectManager.DataAccessLib.Interface;

    public class ProjectService : IProjectService
    {
        IProjectRepository _projectRepository;

        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public List<ProjectModel> GetProjects()
        {
            return _projectRepository.GetProjects();
        }

        public List<ProjectModel> GetProjectsForSearch()
        {
            return _projectRepository.GetProjectsForSearch();
        }

        public ProjectModel GetProjectById(int id)
        {
            return _projectRepository.GetProjectById(id);
        }

        public int Save(ProjectModel model)
        {
            return _projectRepository.Save(model);
        }        

        public bool Delete(int id)
        {
            return _projectRepository.Delete(id);
        }

        public bool Suspend(int id)
        {
            return _projectRepository.Suspend(id);
        }
    }
}
