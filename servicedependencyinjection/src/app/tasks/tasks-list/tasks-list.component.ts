import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private tasksService = inject(TasksService);
  private selectedFilter = signal<string>('all');
  tasks = computed(() => {
    const filter = this.selectedFilter();
    const allTasks = this.tasksService.allTasks();
    if (filter === 'all') {
      return allTasks;
    }
    return allTasks.filter((task) => task.status === filter);
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
