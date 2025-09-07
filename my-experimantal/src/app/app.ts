import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header";
import { ServerStatusComponent } from "./dashboard/server-status/server-status";
import { TrafficComponent } from "./dashboard/traffic/traffic";
import { TicketComponent } from "./dashboard/ticket/ticket";
import { DashboardItemComponent } from "./dashboard/dashboard-item/dashboard-item";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [HeaderComponent, ServerStatusComponent, TrafficComponent, TicketComponent, DashboardItemComponent],
})
export class AppComponent {
  
  
}
