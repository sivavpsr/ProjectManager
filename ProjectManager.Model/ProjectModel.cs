using System;
using System.Collections.Generic;
using System.Linq;

namespace ProjectManager.Model
{
    public class ProjectModel
    {
        public int ProjectId { get; set; }

        public string ProjectDescription { get; set; }

        public int ManagerId { get; set; }

        public string ManagerFirstName { get; set; }

        public string ManagerLastName { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int? Priority { get; set; }

        public string ManagerName
        {
            get
            {
                return ManagerLastName + ", " + ManagerFirstName;
            }
        }

        public int TaskCount
        {
            get
            {
                return Tasks != null ? Tasks.Count : 0;
            }
        }

        public int CompletedTaskCount
        {
            get
            {
                return Tasks != null ? Tasks.Count(t => t.Completed) : 0;
            }
        }

        public List<TaskModel> Tasks { get; set; }
    }
}
