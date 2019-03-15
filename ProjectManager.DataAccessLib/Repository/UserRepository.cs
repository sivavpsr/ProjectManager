using System.Collections.Generic;
using System.Linq;

namespace ProjectManager.DataAccessLib.Repository
{
    using ProjectManager.DataAccessLib.Interface;
    using ProjectManager.Entity.Data;
    using ProjectManager.Entity.Interface;
    using ProjectManager.Entity.Context;
    using ProjectManager.Model;

    public class UserRepository : IUserRepository
    {
        UnitOfWork _unitOfWork;

        public UserRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork as UnitOfWork;
        }

        public List<UserModel> GetUsers()
        {
            List<UserModel> users = (from usr in _unitOfWork.User

                                     where usr.Active

                                     select new UserModel
                                     {
                                         UserId = usr.UserId,
                                         FirstName = usr.FirstName,
                                         LastName = usr.LastName,
                                     }).ToList();

            return users;
        }

        public UserModel GetUserById(int id)
        {
            UserModel user = (from usr in _unitOfWork.User

                              where usr.UserId == id

                              && usr.Active

                              select new UserModel
                              {
                                  UserId = usr.UserId,
                                  FirstName = usr.FirstName,
                                  LastName = usr.LastName,
                              }).FirstOrDefault();

            return user;
        }

        public int Save(UserModel model)
        {
            User user = null;

            user = _unitOfWork.User.FirstOrDefault(usr => usr.UserId == model.UserId);

            if (user == null)
            {
                user = new User();
                _unitOfWork.User.Add(user);
            }
            else
            {
                _unitOfWork.User.Attach(user);
                _unitOfWork.Entry<User>(user).State = System.Data.Entity.EntityState.Modified;                
            }

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Active = true;

            _unitOfWork.SaveChanges();

            return user.UserId;
        }

        public bool Delete(int id)
        {
            User user = _unitOfWork.User.FirstOrDefault(usr => usr.UserId == id);
            user.Active = false;

            _unitOfWork.SaveChanges();

            return true;
        }
    }
}
