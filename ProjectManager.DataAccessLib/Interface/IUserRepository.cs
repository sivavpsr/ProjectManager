using System.Collections.Generic;

namespace ProjectManager.DataAccessLib.Interface
{
    using ProjectManager.Model;

    public interface IUserRepository
    {
        List<UserModel> GetUsers();

        UserModel GetUserById(int id);

        int Save(UserModel model);

        bool Delete(int id);
    }
}
