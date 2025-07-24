import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() tasks: Task[] = [];
  @Input() status: string = 'todo';
  
  constructor(private taskService: TasksService) {}

  /**
   * Track by function for ngFor to optimize rendering performance
   * @param index - Index of the item in the collection
   * @param task - Task object
   * @returns Unique identifier for the task
   */
  trackByTaskId(index: number, task: Task): string | number {
    return task.id || index.toString();
  }

  /**
   * Opens the task form dialog
   * @param task - Task to edit or null for new task
   */
  openForm(task: Task | null): void {
    this.taskService.showTaskDialog(task);
  }
}
