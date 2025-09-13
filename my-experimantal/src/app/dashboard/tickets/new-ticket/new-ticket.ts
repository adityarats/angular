import { AfterViewInit, Component, ElementRef, OnInit, output, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button';
import { ControlComponent } from "../../../shared/control/control";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  imports: [ControlComponent, FormsModule],
  templateUrl: './new-ticket.html',
  styleUrl: './new-ticket.css'
})
export class NewTicketComponent  implements OnInit, AfterViewInit {
  @ViewChild('form') form?: ElementRef<HTMLFormElement>;

  //@Output() add = new

 add = output<{ title: string; text: string }>();

  ngOnInit() {
    console.log('ONINIT');
    console.log(this.form?.nativeElement);
  }

  ngAfterViewInit() {
    console.log('AFTER VIEW INIT');
    console.log(this.form?.nativeElement);
  }

  onSubmit(title: string, ticket: string) {
    console.log(title)
    console.log(ticket)
    this.add.emit({ title: title, text: ticket });
    this.form?.nativeElement.reset()
  }

}
