import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header";
import { DashboardItemComponent } from './dashnoard/dashboard-item/dashboard-item';
import { ServerStatusComponent } from './dashnoard/server-status/server-status';
import { TicketComponent } from './dashnoard/ticket/ticket';
import { TrafficComponent } from './dashnoard/traffic/traffic';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [HeaderComponent, ServerStatusComponent, TrafficComponent, TicketComponent, DashboardItemComponent],
})
export class AppComponent {
  
  
}
