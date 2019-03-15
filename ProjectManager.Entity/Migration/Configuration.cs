using System.Data.Entity.Migrations;

namespace ProjectManager.Entity.Migration
{
    using ProjectManager.Entity.Context;

    public class Configuration : DbMigrationsConfiguration<UnitOfWork>
    {
        public Configuration()
        {
            this.AutomaticMigrationsEnabled = true;
            this.AutomaticMigrationDataLossAllowed = true;
        }
    }
}
