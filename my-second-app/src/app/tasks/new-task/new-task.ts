import { Component, Output, EventEmitter, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskData } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css'
})
export class NewTaskComponent {
@Input({required: true}) userId!: string;
@Output() close = new EventEmitter<void>()
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';
  private taskService = inject(TasksService);

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
   this.taskService.addTask({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDate
    }, this.userId);
    this.close.emit();
  }
}
