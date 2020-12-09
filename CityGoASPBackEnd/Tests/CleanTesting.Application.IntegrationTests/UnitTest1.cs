using Application.Command;
using Application.ViewModel;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace CleanTesting.Application.IntegrationTests
{
    using static Testing;
    public class UnitTest1 : TestBase
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

            var list = await FindAsync<UserVM>(id);

            list.Should().NotBeNull();
            list.Name.Should().Be(newUser.Name);
        }
        /*
        [Test]
        public void CreateUsertest()
        {
            var newUser = new UserVM()
            {
                Name = "Jhon Doe",
                Username = "Jh0nD03",
                Email = "jhon.doe@gmail.com",
                Balls = 1
            }

            // Arrange
            var result = await _mediator.Send(command);

            // Act

            // Assert



            //Arange
            var mediator = new Mock<IMediator>();

            var command = new CreateUserCommand(newUser);
            var handler = new CreateUserCommandHandler(mediator.Object);

            //Act
            Unit x = await handler.Handle(command, new System.Threading.CancellationToken());

            //Asert
            //Do the assertion

            //something like:
            mediator.Verify(x => x.Publish(It.IsAny<CustomersChanged>()));
        }

        [Test]
        public async Task ShouldCreateUser()
        {
            var userId = await RunAsDefaultUserAsync();

            var command = new CreateTodoListCommand
            {
                Title = "Tasks"
            };

            var id = await SendAsync(command);

            var list = await FindAsync<TodoList>(id);

            list.Should().NotBeNull();
            list.Title.Should().Be(command.Title);
            list.CreatedBy.Should().Be(userId);
            list.Created.Should().BeCloseTo(DateTime.Now, 10000);
        }
        */
    }
}