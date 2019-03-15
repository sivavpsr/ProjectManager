using System.Collections.Generic;
using System.Web.Http;

namespace ProjectManager.API.Controllers
{
    using ProjectManager.Model;
    using ProjectManager.BusinessLib.Interface;

    public class UserController : ApiController
    {
        IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/User
        public List<UserModel> GetUsers()
        {
            return _userService.GetUsers();
        }

        // GET: api/User/5
        public UserModel GetUserById(int id)
        {
            return _userService.GetUserById(id);
        }

        // POST: api/User
        public int Save(UserModel model)
        {
            return _userService.Save(model);
        }

        // DELETE: api/User/5
        public bool Delete(int id)
        {
            return _userService.Delete(id);
        }
    }
}
