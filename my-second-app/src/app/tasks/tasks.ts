import { Component, Input } from '@angular/core';
import { UserComponent } from '../user/user';
import { TaskComponent }  from './task/task';
import { NewTaskComponent } from './new-task/new-task';
import { NewTaskData } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class TasksComponent {

    @Input({required: true}) userName: string | undefined;
    @Input({required: true}) userId!: string;
    isAddingTask = false;
  
    constructor(private tasksService: TasksService) {}

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId!);
  }

  onStartAddTask() {
    console.log('Starting to add a new task...');
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }


}
