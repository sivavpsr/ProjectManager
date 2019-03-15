using System;

namespace ProjectManager.Entity.Data
{
    public class Task
    {
        public int TaskId { get; set; }

        public string TaskDescription { get; set; }

        public int ProjectId { get; set; }

        public bool IsParentTask { get; set; }

        public int? ParentTaskId { get; set; }        

        public int? UserId { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int? Priority{ get; set; }        

        public bool Active { get; set; }

        public bool Completed { get; set; }

        public virtual Task ParentTask { get; set; }

        public virtual Project Project { get; set; }

        public virtual User User { get; set; }
    }
}
