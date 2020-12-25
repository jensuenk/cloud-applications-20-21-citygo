using Application.ViewModel.Item;
using Application.ViewModel.Sight;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ISightValidation
    {
        public Task<IActionResult> HandleValidation(SightVM sight);
        //public Task<IActionResult> HandleValidation(ListSightVM listSight);
        public Task<IActionResult> HandleValidation(int errorCode);
    }
}
