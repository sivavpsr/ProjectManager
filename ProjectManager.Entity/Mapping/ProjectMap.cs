using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace ProjectManager.Entity.Mapping
{
    using ProjectManager.Entity.Data;

    public class ProjectMap : EntityTypeConfiguration<Project>
    {
        public ProjectMap()
        {
            this.Property(p => p.ProjectId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(p => p.ProjectDescription).IsRequired().HasMaxLength(40);
            this.Property(p => p.ManagerId).IsRequired();

            this.Property(p => p.StartDate).IsOptional();
            this.Property(p => p.EndDate).IsOptional();
            this.Property(p => p.Priority).IsOptional();

            this.HasRequired(p => p.Manager).WithMany().HasForeignKey(fk => fk.ManagerId);
        }
    }
}
