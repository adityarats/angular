import { Injectable } from "@angular/core";
import { NewTaskData } from "./task/task.model";

@Injectable({providedIn: 'root'})
export class TasksService {
  private tasks = [
      {
        id: 't1',
        userId: 'u1',
        title: 'Mastering Angular',
        dueDate: '2025-12-31',
        summary: 'Learn Angular in depth'
      },
      {
        id: 't2',
        userId: 'u2',
        title: 'Mastering Angular 2',
        dueDate: '2025-12-31',
        summary: 'Learn Angular 2 in depth'
      },
      {
        id: 't3',
        userId: 'u3',
        title: 'Mastering Angular 3',
        dueDate: '2024-12-31',
        summary: 'Learn Angular 3 in depth'
      }
    ];

  getUserTasks(userId: string) {
    return this.tasks.filter(task => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string) {
    const newTask = {
      id: 't' + (this.tasks.length + 1),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.dueDate
    };
    this.tasks.push(newTask);
  }

  removeTask(taskId: string) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}
