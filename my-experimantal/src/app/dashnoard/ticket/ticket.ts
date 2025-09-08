import { Component } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket';

@Component({
  selector: 'app-ticket',
  imports: [NewTicketComponent],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css'
})
export class TicketComponent {

}
