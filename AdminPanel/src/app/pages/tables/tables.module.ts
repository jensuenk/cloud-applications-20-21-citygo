import { NgModule } from '@angular/core';
import { NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDialogModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { ItemsTableComponent } from './items-table/items-table.component';
import { ChallengesTableComponent } from './challenges-table/challenges-table.component';
import { SightsTableComponent } from './sights-table/sights-table.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { FormsModule } from '@angular/forms';
import { PolygonDialogComponentComponent } from './sights-table/polygon-dialog-component/polygon-dialog-component.component';
import { AgmCoreModule } from '@agm/core';
import { LocationDialogComponentComponent } from './items-table/location-dialog-component/location-dialog-component.component';
import { ChallengesDialogComponentComponent } from './sights-table/challenges-dialog-component/challenges-dialog-component.component';
import { ItemsDialogComponentComponent } from './challenges-table/items-dialog-component/items-dialog-component.component';

@NgModule({
  imports: [
    FormsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAlertModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbDialogModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDk16Jhr5ke2tbVzaud9WrawEKmJycjB0A'
    })
  ],
  declarations: [
    ...routedComponents,
    ItemsTableComponent,
    ChallengesTableComponent,
    SightsTableComponent,
    UsersTableComponent,
    PolygonDialogComponentComponent,
    LocationDialogComponentComponent,
    ChallengesDialogComponentComponent,
    ItemsDialogComponentComponent,
  ],
})
export class TablesModule { }
