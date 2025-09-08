import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button';
import { ControlComponent } from "../../../shared/control/control";

@Component({
  selector: 'app-new-ticket',
  imports: [ButtonComponent, ControlComponent],
  templateUrl: './new-ticket.html',
  styleUrl: './new-ticket.css'
})
export class NewTicketComponent {

}
