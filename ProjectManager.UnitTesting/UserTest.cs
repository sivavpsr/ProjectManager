using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using NUnit.Framework;

namespace ProjectManager.UnitTest
{
    using ProjectManager.Model;

    [TestFixture]
    public class TC01_UserTest
    {
        string baseUri = ConfigurationManager.AppSettings["BaseURI"];
        int userId = 0;
        string firstName = "First " + DateTime.Now.ToString("yyyyMMddHHmmss");
        string lastName = "Last " + DateTime.Now.ToString("yyyyMMddHHmmss");

        [Test]
        public void T101_GetUsers()
        {
            var items = GetUsers();
            Assert.Greater(items.Count, 0);
        }

        [Test]
        public void T102_AddUser()
        {
            UserModel model = new UserModel();
            model.FirstName = firstName;
            model.LastName = lastName;
            userId = Save(model);

            var item = GetUserById(userId);
            Assert.AreEqual(item.UserId, userId);
        }

        [Test]
        public void T103_UpdateUser()
        {
            UserModel model = new UserModel();
            model.FirstName = firstName + " updated";
            model.LastName = lastName + " updated";
            userId = Save(model);

            var item = GetUserById(userId);
            Assert.AreEqual(item.UserId, userId);
        }
        
        [Test]
        public void T104_GetUserById()
        {
            var item = GetUserById(userId);
            Assert.AreEqual(item.UserId, userId);
        }

        [Test]
        public void T105_DeleteUser()
        {
            DeleteUser(userId);

            var item = GetUserById(userId);

            Assert.AreEqual(null, item);
        }

        [Test]
        public void T106_CreateUser2()
        {
            UserModel model = new UserModel();
            model.FirstName = firstName;
            model.LastName = lastName;
            userId = Save(model);

            var item = GetUserById(userId);
            Assert.AreEqual(item.UserId, userId);

            GlobalConstants.USER_ID = userId;
        }

        private List<UserModel> GetUsers()
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUri);

            var response = client.GetAsync("/api/user/getusers").Result;
            var users = response.Content.ReadAsAsync<List<UserModel>>().Result;
            return users;
        }

        private UserModel GetUserById(int id)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUri);

            var response = client.GetAsync("/api/user/getuserbyid/" + id.ToString()).Result;
            var task = response.Content.ReadAsAsync<UserModel>().Result;
            return task;
        }

        private int Save(UserModel model)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUri);

            var response = client.PostAsJsonAsync<UserModel>("/api/user/save", model).Result;
            var id = response.Content.ReadAsAsync<int>().Result;
            return id;
        }

        private void DeleteUser(int id)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUri);

            var response = client.DeleteAsync("/api/user/delete/" + id.ToString()).Result;
            response.EnsureSuccessStatusCode();
        }
    }
}
