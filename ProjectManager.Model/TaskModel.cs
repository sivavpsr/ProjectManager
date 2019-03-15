using System;

namespace ProjectManager.Model
{
    public class TaskModel
    {
        public int TaskId { get; set; }

        public string TaskDescription { get; set; }

        public int ProjectId { get; set; }

        public string ProjectDescription { get; set; }

        public int? ParentTaskId { get; set; }

        public string ParentTaskDescription { get; set; }       
        
        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int? Priority { get; set; }

        public bool Completed { get; set; }

        public bool IsParentTask { get; set; }

        public int? UserId { get; set; }

        public string UserFirstName { get; set; }

        public string UserLastName { get; set; }

        public string UserName
        {
            get
            {
                return this.UserId.HasValue ? this.UserLastName + ", " + this.UserFirstName : string.Empty;
            }
        }
    }
}
