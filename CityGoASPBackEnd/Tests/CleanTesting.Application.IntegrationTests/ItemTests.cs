using Application.Command.Item;
using Application.ViewModel;
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
    public class ItemTests : TestBase
    {
        [Test]
        public async Task ShouldCreateUser()
        {
            var newItem = new ItemVM()
            {
                Name = "testitem",
                Picture = "test",
                Rarity = "rare",
            };

            var command1= new CreateItemCommand(newItem);
            var cancelationToken1 = await SendAsync(command1);
            var item = await FindAsync<Item>(1);

            item.Name.Should().Be("testitem");
        }

        [Test]
        public async Task ShouldNotDeleteItem()
        {
            var newItem = new ItemVM()
            {
                Name = "testitem",
                Picture = "test",
                Rarity = "rare",
            };

            var command1 = new CreateItemCommand(newItem);
            var cancelationToken1 = await SendAsync(command1);
            var item = await FindAsync<Item>(1);

            var command2 = new DeleteItemCommand(2);
            var cancelationToken2 = await SendAsync(command2);
           
            cancelationToken2.Should().Be(4042);
            item.Should().NotBeNull();
        }

        [Test]
        public async Task ShouldUpdateUser()
        {
            var newItem = new ItemVM()
            {
                Name = "testitem",
                Picture = "test",
                Rarity = "rare",
            };

            var command1 = new CreateItemCommand(newItem);
            var cancelationToken1 = await SendAsync(command1);
            var item = await FindAsync<Item>(1);

            item.Name.Should().Be("testitem");
            item.Should().NotBeNull();

            var updateItem = new ItemVM()
            {
                ItemId = 1,
                Name = "testitemUpdate",
                Picture = "testUpdate",
                Rarity = "rareUpdate",
            };

            var command2 = new UpdateItemCommand(updateItem);
            var cancelationToken2 = await SendAsync(command2);
            var itemUpdated = await FindAsync<Item>(item.ItemId);

            itemUpdated.Should().NotBeNull();
            itemUpdated.Name.Should().Be("testitemUpdate");
            itemUpdated.Picture.Should().Be("testUpdate");
            itemUpdated.Rarity.Should().Be("rareUpdate");
        }
    }
}
