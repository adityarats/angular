import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  imports: [],
  templateUrl: './dashboard-item.html',
  styleUrl: './dashboard-item.css',
})
export class DashboardItemComponent {

  //@Input({required: true}) image!: {src: string, alt: string};
  //@Input({required: true}) title!: string;
 // @Input({required: true}) status!: string;

  image = input.required<{src: string, alt: string}>();
  title = input.required<string>();

}
