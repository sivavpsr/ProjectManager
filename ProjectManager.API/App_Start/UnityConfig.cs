using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace ProjectManager.API
{
    using ProjectManager.BusinessLib.Interface;
    using ProjectManager.BusinessLib.Service;
    using ProjectManager.DataAccessLib.Interface;
    using ProjectManager.DataAccessLib.Repository;
    using ProjectManager.Entity.Interface;
    using ProjectManager.Entity.Context;

    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();

            container.RegisterType<IUnitOfWork, UnitOfWork>();

            container.RegisterType<IUserRepository, UserRepository>();
            container.RegisterType<IProjectRepository, ProjectRepository>();
            container.RegisterType<ITaskRepository, TaskRepository>();

            container.RegisterType<IUserService, UserService>();
            container.RegisterType<IProjectService, ProjectService>();
            container.RegisterType<ITaskService, TaskService>();


            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}