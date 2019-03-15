using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace ProjectManager.Entity.Mapping
{
    using ProjectManager.Entity.Data;

    public class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            this.Property(p => p.UserId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(p => p.FirstName).IsRequired().HasMaxLength(40);
            this.Property(p => p.LastName).IsRequired().HasMaxLength(40);
        }
    }
}
