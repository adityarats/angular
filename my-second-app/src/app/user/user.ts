import { Component, computed, Input, Output, input, EventEmitter} from '@angular/core';
import { User } from './user.model';
import { CardComponent } from '../shared/card/card';


@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.html',
  styleUrl: './user.css',
  imports: [CardComponent]
})
export class UserComponent {

  @Input({required: true}) user!: User;
  @Input({required: true}) selected!: boolean;

  @Output() select = new EventEmitter<string>();

  //avatar = input.required<string>();
  //name = input.required<string>();
  //id = input.required<string>();

  //imagePath = computed(() => `./assets/users/${this.avatar}`);

get imagePath() {
    return `./assets/users/${this.user.avatar}`;
  }

  onSelectUser() {
    this.select.emit(this.user.id);
  }

}
