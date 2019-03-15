using System.Collections.Generic;

namespace ProjectManager.BusinessLib.Interface
{
    using ProjectManager.Model;

    public interface IProjectService
    {
        List<ProjectModel> GetProjects();

        List<ProjectModel> GetProjectsForSearch();

        ProjectModel GetProjectById(int id);

        int Save(ProjectModel model);

        bool Delete(int id);

        bool Suspend(int id);
    }
}
