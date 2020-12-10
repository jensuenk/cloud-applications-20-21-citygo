using Application.Command;
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

            var list = await FindAsync<User>(id);

            list.Should().NotBeNull();
            list.Name.Should().Be(newUser.Name);
        }
    }
}