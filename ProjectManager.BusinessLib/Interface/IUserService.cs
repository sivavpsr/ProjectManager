using System.Collections.Generic;

namespace ProjectManager.BusinessLib.Interface
{
    using ProjectManager.Model;

    public interface IUserService
    {
        List<UserModel> GetUsers();

        UserModel GetUserById(int id);

        int Save(UserModel model);

        bool Delete(int id);
    }
}
