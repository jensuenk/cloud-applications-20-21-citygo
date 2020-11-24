import { NgModule } from '@angular/core';
import { NbAlertModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { ItemsTableComponent } from './items-table/items-table.component';
import { ChallengesTableComponent } from './challenges-table/challenges-table.component';
import { SightsTableComponent } from './sights-table/sights-table.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { FormsModule } from '@angular/forms';
import { PolygonDialogComponentComponent } from './sights-table/polygon-dialog-component/polygon-dialog-component.component';

@NgModule({
  imports: [
    FormsModule,
    NbButtonModule,
    NbAlertModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbDialogModule.forRoot()
  ],
  declarations: [
    ...routedComponents,
    ItemsTableComponent,
    ChallengesTableComponent,
    SightsTableComponent,
    UsersTableComponent,
    PolygonDialogComponentComponent,
  ],
})
export class TablesModule { }
