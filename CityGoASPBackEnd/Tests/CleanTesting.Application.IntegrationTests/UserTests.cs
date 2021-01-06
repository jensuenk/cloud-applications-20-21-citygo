using Application.Command;
using Application.Command.User;
using Application.ViewModel;
using Domain;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Collections.Generic;
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

        [Test]
        public async Task ShouldAddFriend()
        {
            var newUser = new UserVM()
            {
                Name = "Test",
                Username = "Test123",
                Email = "test@gmail.com",
                Balls = 10
            };
            var createCommand = new CreateUserCommand(newUser);
            var id = await SendAsync(createCommand);
            var user = await FindAsync<User>(id);


            var newUser2 = new UserVM()
            {
                Name = "Test2",
                Username = "Test123_2",
                Email = "test2@gmail.com",
                Balls = 20
            };
            var createCommand2 = new CreateUserCommand(newUser2);
            var id2 = await SendAsync(createCommand2);
            var user2 = await FindAsync<User>(id2);
            

            var addFriendCommand = new AddFriendCommand(id, id2);
            var idResult = await SendAsync(addFriendCommand);
            var friendStaus = await FindAsync<Friends>(1);

            friendStaus.AcceptedUser1.Should().Be(true);
            friendStaus.AcceptedUser2.Should().Be(false);
            friendStaus.UserId.Should().Be(user.UserId);
            friendStaus.FriendId.Should().Be(user2.UserId);
        }


        [Test]
        public async Task ShouldUpdateUsesWrong()
        {
            var oldUser = new UserVM()
            {
                Name = "Test",
                Username = "Test123",
                Email = "test@gmail.com",
                Balls = 10
            };

            var command = new CreateUserCommand(oldUser);
            var id = await SendAsync(command);
            var user = await FindAsync<User>(id);

            var newUser = new UserVM()
            {
                UserId = 500,
                Name = "Test2",
                Username = "Test1232",
                Email = "test2@gmail.com",
                Balls = 10
            };

            var commandupdate = new UpdateUserCommand(newUser);
            var cancelationToken = await SendAsync(commandupdate);
            

            user.Should().NotBeNull();
            cancelationToken.Should().Be(4001);
        }

        [Test]
        public async Task ShouldAcceptFriend()
        {
            var newUser = new UserVM()
            {
                Name = "Test",
                Username = "Test123",
                Email = "test@gmail.com",
                Balls = 10
            };
            var createCommand = new CreateUserCommand(newUser);
            var id = await SendAsync(createCommand);
            var user = await FindAsync<User>(id);


            var newUser2 = new UserVM()
            {
                Name = "Test2",
                Username = "Test123_2",
                Email = "test2@gmail.com",
                Balls = 20
            };
            var createCommand2 = new CreateUserCommand(newUser2);
            var id2 = await SendAsync(createCommand2);
            var user2 = await FindAsync<User>(id2);


            var addFriendCommand = new AddFriendCommand(id, id2);
            var cancelationToken = await SendAsync(addFriendCommand);
            var friendStaus = await FindAsync<Friends>(1);

            var acceptFriendCommand = new AcceptFriendRequestCommand(id2, id);
            var cancelationToken2 = await SendAsync(addFriendCommand);
            var friendStausAccept = await FindAsync<Friends>(1);

            friendStausAccept.AcceptedUser1.Should().Be(true);
            friendStausAccept.AcceptedUser2.Should().Be(true);
            friendStausAccept.UserId.Should().Be(user.UserId);
            friendStausAccept.FriendId.Should().Be(user2.UserId);
        }
    }
}