using Application.Command;
using Application.Command.User;
using Application.ViewModel;
using Domain;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace CleanTesting.Application.IntegrationTests
{
    using static Testing;
    public class UserTests : TestBase
    {
        [Test]
        public async Task ShouldCreateUser()
        {
            var newUser = new UserVM()
            {
                Name = "Jhon Doe",
                Username = "Jh0nD03",
                Email = "jhon.doe@gmail.com",
                Balls = 1
            };

            var command = new CreateUserCommand(newUser);

            var id = await SendAsync(command);

            var user = await FindAsync<User>(id);

            user.Should().NotBeNull();
            user.Name.Should().Be(newUser.Name);
        }

        [Test]
        public async Task ShouldCreateUserWithWrongName()
        {
            var newUser = new UserVM()
            {
                Name = "Test",
                Username = "Test123",
                Email = "test@gmail.com",
                Balls = 10
            };

            var command = new CreateUserCommand(newUser);

            var id = await SendAsync(command);

            var user = await FindAsync<User>(id);

            user.Should().NotBeNull();
            user.Username.Should().Be(newUser.Username);
            user.Email.Should().Be(newUser.Email);
            user.Balls.Should().Be(newUser.Balls);
            user.Name.Should().NotBe("Test User");
        }

        [Test]
        public async Task ShouldDeleteUser()
        {
            var newUser = new UserVM()
            {
                Name = "Test",
                Username = "Test123",
                Email = "test@gmail.com",
                Balls = 10
            };

            var createCommand = new CreateUserCommand(newUser);

            var createId = await SendAsync(createCommand);

            var createdUser = await FindAsync<User>(createId);

            createdUser.Should().NotBeNull();


            var command = new DeleteUserCommand(createdUser.UserId);

            var id = await SendAsync(command);

            var user = await FindAsync<User>(id);

            user.Should().BeNull();
        }
    }
}