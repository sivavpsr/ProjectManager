using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NBench;

namespace ProjectManager.PerformanceTesting
{
    using ProjectManager.Model;
    using ProjectManager.BusinessLib.Interface;
    using ProjectManager.BusinessLib.Service;
    using ProjectManager.DataAccessLib.Interface;
    using ProjectManager.DataAccessLib.Repository;
    using ProjectManager.Entity.Context;
    using ProjectManager.Entity.Interface;

    [TestClass]
    public class ProjectManagerPerformanceTest
    {
        ITaskService taskService;
        TaskModel taskModel;
        int projectId;
        int userId;

        [PerfSetup]
        public void Setup(BenchmarkContext context)
        {
            IUnitOfWork unitOfWork = new UnitOfWork();

            IUserRepository userRepos = new UserRepository(unitOfWork);
            IUserService userService = new UserService(userRepos);
            List<UserModel> users = userService.GetUsers();
            userId = users[0].UserId;

            IProjectRepository projectRepos = new ProjectRepository(unitOfWork);
            IProjectService projectService = new ProjectService(projectRepos);
            List<ProjectModel> projects = projectService.GetProjects();
            projectId = projects[0].ProjectId;

            ITaskRepository taskRepos = new TaskRepository(unitOfWork);
            taskService = new TaskService(taskRepos);           
            
            taskModel = new TaskModel
            {
                TaskDescription = "Perf testing",
                ProjectId = projectId,
                Priority = 10,
                StartDate = DateTime.Today,
                EndDate = DateTime.Today.AddDays(2),
                UserId = userId
            };
        }

        [PerfBenchmark(NumberOfIterations = 500, RunMode = RunMode.Iterations, TestMode = TestMode.Test, SkipWarmups = true)]
        [ElapsedTimeAssertion(MaxTimeMilliseconds = 100)]
        public void GetAllTasks_500_Iterations()
        {
            taskService.GetTasksByProject(projectId);
        }

        [PerfBenchmark(RunTimeMilliseconds = 100000, RunMode = RunMode.Throughput, TestMode = TestMode.Test, SkipWarmups = true)]
        [ElapsedTimeAssertion(MaxTimeMilliseconds = 3000)]
        public void GetAllTasks_10_Minutes()
        {
            taskService.GetTasksByProject(projectId);
        }

        [PerfBenchmark(NumberOfIterations = 1, RunMode = RunMode.Iterations, TestMode = TestMode.Test, SkipWarmups = true)]
        [ElapsedTimeAssertion(MaxTimeMilliseconds = 50)]
        public void AddTask_Elapsed_Time()
        {
            taskService.Save(taskModel);
        }

        [PerfBenchmark(NumberOfIterations = 1, RunMode = RunMode.Iterations, TestMode = TestMode.Test, SkipWarmups = true)]
        [MemoryAssertion(MemoryMetric.TotalBytesAllocated, MustBe.GreaterThan, ByteConstants.SixtyFourKb)]
        public void AddTask_Memmory_Consumed()
        {
            taskService.Save(taskModel);
        }
    }
}
