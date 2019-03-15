using System.Collections.Generic;

namespace ProjectManager.BusinessLib.Service
{
    using ProjectManager.BusinessLib.Interface;
    using ProjectManager.Model;
    using ProjectManager.DataAccessLib.Interface;

    public class UserService : IUserService
    {
        IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public List<UserModel> GetUsers()
        {
            return _userRepository.GetUsers();
        }

        public UserModel GetUserById(int id)
        {
            return _userRepository.GetUserById(id);
        }

        public int Save(UserModel model)
        {
            return _userRepository.Save(model);
        }        

        public bool Delete(int id)
        {
            return _userRepository.Delete(id);
        }
    }
}
