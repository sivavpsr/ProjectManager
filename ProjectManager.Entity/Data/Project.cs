using System;
using System.Collections.Generic;

namespace ProjectManager.Entity.Data
{
    public class Project
    {
        public int ProjectId { get; set; }

        public string ProjectDescription { get; set; }

        public int ManagerId { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int? Priority{ get; set; }

        public virtual User Manager { get; set; }

        public bool Active { get; set; }
    }
}
