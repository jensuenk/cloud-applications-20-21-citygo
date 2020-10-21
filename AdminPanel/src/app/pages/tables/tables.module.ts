import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { ItemsTableComponent } from './items-table/items-table.component';
import { ChallengesTableComponent } from './challenges-table/challenges-table.component';
import { SightsTableComponent } from './sights-table/sights-table.component';
import { UsersTableComponent } from './users-table/users-table.component';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    ItemsTableComponent,
    ChallengesTableComponent,
    SightsTableComponent,
    UsersTableComponent,
  ],
})
export class TablesModule { }
