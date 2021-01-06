using Application.Command.Sight;
using Application.ViewModel.Item;
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
    public class SightTests : TestBase
    {
        [Test]
        public async Task ShouldCreateSight()
        {
            var newSight = new SightVM()
            {
               Name = "test",
               Info = "testInfo",
               Monument = true,
               Stop = false
            };

            var command1 = new CreateSightCommand(newSight);
            var cancelationToken1 = await SendAsync(command1);
            var sight = await FindAsync<Sight>(1);

            sight.Should().NotBeNull();
            sight.Name.Should().Be("test");
        }

        [Test]
        public async Task ShouldUpdateSight()
        {
            var newSight = new SightVM()
            {
                Name = "test",
                Info = "testInfo",
                Monument = true,
                Stop = false
            };

            var command1 = new CreateSightCommand(newSight);
            var cancelationToken1 = await SendAsync(command1);
            var sight = await FindAsync<Sight>(1);

            sight.Should().NotBeNull();
            sight.Monument.Should().Be(true);

            var updateSight = new SightVM()
            {
                SightId = 1,
                Name = "test",
                Info = "testInfo",
                Monument = false,
                Stop = true
            };

            var command2 = new UpdateSightCommand(updateSight);
            var cancelationToken2 = await SendAsync(command2);
            var sight2 = await FindAsync<Sight>(1);

            sight2.Should().NotBeNull();
            sight2.Monument.Should().Be(false);
        }
        [Test]
        public async Task ShouldDeleteSight()
        {
            var newSight = new SightVM()
            {
                Name = "test",
                Info = "testInfo",
                Monument = true,
                Stop = false
            };

            var command1 = new CreateSightCommand(newSight);
            var cancelationToken1 = await SendAsync(command1);
            var sight = await FindAsync<Sight>(1);

            sight.Should().NotBeNull();
            sight.Name.Should().Be("test");

            var command2 = new DeleteSightCommand(sight.SightId);
            var cancelationToken2 = await SendAsync(command2);
            var sight2 = await FindAsync<Sight>(sight.SightId);

            sight2.Should().BeNull();
        }

    }
}
