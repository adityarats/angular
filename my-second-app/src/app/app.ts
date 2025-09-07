import { Component } from '@angular/core';

import { HeaderComponent } from './header/header';
import { UserComponent } from "./user/user";
import { DUMMY_USERS } from './dummy-users';
import { TasksComponent } from "./tasks/tasks";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {

  users = DUMMY_USERS;
  selectedUserId?: string;

  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserId);
  }

  onSelectUser(id: string) {
    this.selectedUserId = id;
  }
}


