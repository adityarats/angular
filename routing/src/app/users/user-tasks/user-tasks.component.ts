import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRouteSnapshot, Params, ResolveFn, Router, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {

  userName= input.required<string>();
  message = input.required
  
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot, 
  routerState: RouterStateSnapshot
) => {
  const userService = inject(UsersService);
  const userName = userService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name || '';

  return userName;
};


export const resolveTitle: ResolveFn<string> = (
  activatedRoute, 
  routerState
) => {
  return resolveUserName(activatedRoute, routerState) + '\'s Tasks';
};