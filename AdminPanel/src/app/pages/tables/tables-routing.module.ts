import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { ItemsTableComponent } from './items-table/items-table.component';
import { SightsTableComponent } from './sights-table/sights-table.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { ChallengesTableComponent } from './challenges-table/challenges-table.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'smart-table',
      component: SmartTableComponent,
    },
    {
      path: 'items',
      component: ItemsTableComponent,
    },
    {
      path: 'challenges',
      component: ChallengesTableComponent,
    },
    {
      path: 'users',
      component: UsersTableComponent,
    },
    {
      path: 'sights',
      component: SightsTableComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
];
