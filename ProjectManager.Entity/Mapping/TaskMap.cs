using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace ProjectManager.Entity.Mapping
{
    using ProjectManager.Entity.Data;

    public class TaskMap : EntityTypeConfiguration<Task>
    {
        public TaskMap()
        {
            this.Property(p => p.TaskId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(p => p.TaskDescription).IsRequired().HasMaxLength(40);

            this.Property(p => p.ParentTaskId).IsOptional();
            this.Property(p => p.ProjectId).IsOptional();
            this.Property(p => p.StartDate).IsOptional();
            this.Property(p => p.EndDate).IsOptional(); 
            this.Property(p => p.Priority).IsOptional();
            this.Property(p => p.UserId).IsOptional();

            this.HasOptional(p => p.ParentTask).WithMany().HasForeignKey(fk => fk.ParentTaskId);
            this.HasOptional(p => p.Project).WithMany().HasForeignKey(fk => fk.ProjectId);
            this.HasOptional(p => p.User).WithMany().HasForeignKey(fk => fk.UserId);
        }
    }
}
