using Application.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IItemValidation
    {
        public Task<IActionResult> HandleValidation(ItemVM item);
        public Task<IActionResult> HandleValidation(ListItemVM listItem);
        public Task<IActionResult> HandleValidation(int errorCode);
    }
}
