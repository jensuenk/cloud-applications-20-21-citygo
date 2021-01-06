using Application.Command;
using Application.Command.Item;
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

            var cancelationToken = await SendAsync(command);

            var user = await FindAsync<User>(1);

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

            var cancelationToken = await SendAsync(command);

            var user = await FindAsync<User>(1);

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

            var cancelationToken = await SendAsync(createCommand);

            var createdUser = await FindAsync<User>(1);

            createdUser.Should().NotBeNull();


            var command = new DeleteUserCommand(createdUser.UserId);

            var cancelationToken2 = await SendAsync(command);

            var user = await FindAsync<User>(createdUser.UserId);

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
            var cancelationToken = await SendAsync(createCommand);
            var user = await FindAsync<User>(1);


            var newUser2 = new UserVM()
            {
                Name = "Test2",
                Username = "Test123_2",
                Email = "test2@gmail.com",
                Balls = 20
            };
            var createCommand2 = new CreateUserCommand(newUser2);
            var cancelationToken2 = await SendAsync(createCommand2);
            var user2 = await FindAsync<User>(2);
            

            var addFriendCommand = new AddFriendCommand(user.UserId, user2.UserId);
            var cancelationToken3 = await SendAsync(addFriendCommand);
            var friendStaus = await FindAsync<Friends>(1);

            friendStaus.AcceptedUser1.Should().Be(true);
            friendStaus.AcceptedUser2.Should().Be(false);
            friendStaus.UserId.Should().Be(user.UserId);
            friendStaus.FriendId.Should().Be(user2.UserId);
        }


        [Test]
        public async Task ShouldUpdateUserWrong()
        {
            var oldUser = new UserVM()
            {
                Name = "Test",
                Username = "Test123",
                Email = "test@gmail.com",
                Balls = 10
            };

            var command = new CreateUserCommand(oldUser);
            var cancelationToken = await SendAsync(command);
            var user = await FindAsync<User>(1);

            var newUser = new UserVM()
            {
                UserId = 500,
                Name = "Test2",
                Username = "Test1232",
                Email = "test2@gmail.com",
                Balls = 10
            };

            var commandupdate = new UpdateUserCommand(newUser);
            var cancelationToken2 = await SendAsync(commandupdate);
            

            user.Should().NotBeNull();
            cancelationToken2.Should().Be(4001);
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
            var cancelationToken = await SendAsync(createCommand);
            var user = await FindAsync<User>(1);


            var newUser2 = new UserVM()
            {
                Name = "Test2",
                Username = "Test123_2",
                Email = "test2@gmail.com",
                Balls = 20
            };
            var createCommand2 = new CreateUserCommand(newUser2);
            var cancelationToken2 = await SendAsync(createCommand2);
            var user2 = await FindAsync<User>(2);


            var addFriendCommand = new AddFriendCommand(user.UserId, user2.UserId);
            var cancelationToken3 = await SendAsync(addFriendCommand);
            var friendStaus = await FindAsync<Friends>(1);

            var acceptFriendCommand = new AcceptFriendRequestCommand(user2.UserId, user.UserId);
            var cancelationToken4 = await SendAsync(acceptFriendCommand);
            var friendStausAccept = await FindAsync<Friends>(2);

            friendStaus.AcceptedUser1.Should().Be(true);
            friendStaus.AcceptedUser2.Should().Be(false);
            friendStausAccept.AcceptedUser1.Should().Be(true);
            friendStausAccept.AcceptedUser2.Should().Be(true);
            friendStausAccept.UserId.Should().Be(user2.UserId);
            friendStausAccept.FriendId.Should().Be(user.UserId);
        }

        [Test]
        public async Task ShouldFailToAcceptFriend()
        {
            var newUser = new UserVM()
            {
                Name = "Test",
                Username = "Test123",
                Email = "test@gmail.com",
                Balls = 10
            };
            var createCommand = new CreateUserCommand(newUser);
            var cancelationToken = await SendAsync(createCommand);
            var user = await FindAsync<User>(1);


            var newUser2 = new UserVM()
            {
                Name = "Test2",
                Username = "Test123_2",
                Email = "test2@gmail.com",
                Balls = 20
            };
            var createCommand2 = new CreateUserCommand(newUser2);
            var cancelationToken2 = await SendAsync(createCommand2);
            var user2 = await FindAsync<User>(2);

            var acceptFriendCommand = new AcceptFriendRequestCommand(user2.UserId, user.UserId);
            var cancelationToken3 = await SendAsync(acceptFriendCommand);
            var friendStausAccept = await FindAsync<Friends>(2);


            cancelationToken3.Should().Be(4002);
        }

        [Test]
        public async Task ShouldAddItemToUser()
        {
            var newUser = new UserVM()
            {
                Name = "Jhon Doe",
                Username = "Jh0nD03",
                Email = "jhon.doe@gmail.com",
                Balls = 1
            };

            var command = new CreateUserCommand(newUser);
            var cancelationToken = await SendAsync(command);
            var user = await FindAsync<User>(1);

            var newItem = new ItemVM()
            {
                Name = "testitem",
                Picture="test",
                Rarity = "rare",
            };

            var command2 = new CreateItemCommand(newItem);
            var cancelationToken2 = await SendAsync(command2);
            var item = await FindAsync<Item>(1);

            var command3 = new AddItemToUserCommand(user.UserId, item.ItemId);
            var cancelationToken3 = await SendAsync(command3);

            var resultUserItems = await FindAsyncComposite<UsersItems>(1,1);

            resultUserItems.ItemId.Should().Be(item.ItemId);
            resultUserItems.UserId.Should().Be(user.UserId);
        }
    }
}