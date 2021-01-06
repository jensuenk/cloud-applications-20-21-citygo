using Application.Command;
using Application.Command.Challenge;
using Application.Command.Item;
using Application.Command.User;
using Application.ViewModel;
using Application.ViewModel.Challenge;
using Domain;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CleanTesting.Application.IntegrationTests
{
    using static Testing;
    public class ChallengeTests : TestBase
    {
        [Test]
        public async Task ShouldCreateChallenge()
        {
            var newChallenge= new ChallengeVM()
            {
               Name = "TestChal",
               QuestionChallenge = "Vraag",
               Answer = "Antwoord",
               Score = 10,
               Task = "Taak"
            };

            var command1 = new CreateChallengeCommand(newChallenge);
            var cancelationToken1 = await SendAsync(command1);
            var challenge = await FindAsync<Challenge>(1);

            challenge.Should().NotBeNull();
            challenge.Name.Should().Be("TestChal");
        }

        [Test]
        public async Task ShouldAddChallengeToUser()
        {
            var newChallenge = new ChallengeVM()
            {
                Name = "TestChal",
                QuestionChallenge = "Vraag",
                Answer = "Antwoord",
                Score = 10,
                Task = "Taak"
            };

            var command1 = new CreateChallengeCommand(newChallenge);
            var cancelationToken1 = await SendAsync(command1);
            var challenge = await FindAsync<Challenge>(1);

            challenge.UsersChallenges.Should().BeNull();

            var newUser = new UserVM()
            {
                Name = "Test",
                Username = "Test123",
                Email = "test@gmail.com",
                Balls = 10
            };
            var createCommand2 = new CreateUserCommand(newUser);
            var cancelationToken2 = await SendAsync(createCommand2);
            var user = await FindAsync<User>(1);

            var command3 = new AddChallengeToUserCommand(user.UserId, challenge.ChallengeId);
            var cancelationToken3 = await SendAsync(command3);

            var resultUserChallenges = await FindAsyncComposite<UsersChallenges>(user.UserId, challenge.ChallengeId);

            resultUserChallenges.ChallengeId.Should().Be(challenge.ChallengeId);
            resultUserChallenges.UserId.Should().Be(user.UserId);
        }

        [Test]
        public async Task ShouldDeleteChallengeWithRelation()
        {
            var newChallenge = new ChallengeVM()
            {
                Name = "TestChal",
                QuestionChallenge = "Vraag",
                Answer = "Antwoord",
                Score = 10,
                Task = "Taak"
            };

            var command1 = new CreateChallengeCommand(newChallenge);
            var cancelationToken1 = await SendAsync(command1);
            var challenge = await FindAsync<Challenge>(1);

            challenge.UsersChallenges.Should().BeNull();

            var newUser = new UserVM()
            {
                Name = "Test",
                Username = "Test123",
                Email = "test@gmail.com",
                Balls = 10
            };
            var createCommand2 = new CreateUserCommand(newUser);
            var cancelationToken2 = await SendAsync(createCommand2);
            var user = await FindAsync<User>(1);

            var command3 = new AddChallengeToUserCommand(user.UserId, challenge.ChallengeId);
            var cancelationToken3 = await SendAsync(command3);

            var resultUserChallenges = await FindAsyncComposite<UsersChallenges>(user.UserId, challenge.ChallengeId);

            resultUserChallenges.ChallengeId.Should().Be(challenge.ChallengeId);
            resultUserChallenges.UserId.Should().Be(user.UserId);

            var command4 = new DeleteChallengeCommand(challenge.ChallengeId);
            var cancelationToken4 = await SendAsync(command4);
            var challenge2 = await FindAsync<Challenge>(1);

            challenge2.Should().BeNull();

            var resultUserChallenges2 = await FindAsyncComposite<UsersChallenges>(user.UserId, challenge.ChallengeId);
            resultUserChallenges2.Should().BeNull();
        }
    }
}
