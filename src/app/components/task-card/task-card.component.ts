import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { MatIconModule } from '@angular/material/icon';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() tasks: any;
  @Input() status!: string;
  
  constructor(private taskService: TasksService) {}

  openForm(task: Task | null) {
    this.taskService.showTaskDialog(task);
  }
}
