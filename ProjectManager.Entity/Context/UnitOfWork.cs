using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace ProjectManager.Entity.Context
{
    using ProjectManager.Entity.Data;
    using ProjectManager.Entity.Mapping;
    using ProjectManager.Entity.Interface;

    public class UnitOfWork : DbContext, IUnitOfWork
    {
        public UnitOfWork() : base("AppDBConnectionString")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Configurations.Add<User>(new UserMap());
            modelBuilder.Configurations.Add<Project>(new ProjectMap());
            modelBuilder.Configurations.Add<Task>(new TaskMap());

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> User { get; set; }

        public DbSet<Project> Project { get; set; }

        public DbSet<Task> Task { get; set; }

        public override int SaveChanges()
        {
            return base.SaveChanges();
        }
    }
}
