using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Application.Query
{
    public partial class ShowUserByIdQuery : Component
    {
        public ShowUserByIdQuery()
        {
            InitializeComponent();
        }

        public ShowUserByIdQuery(IContainer container) 
        {
            container.Add(this);
            InitializeComponent();
        }
    }
}
