import { Component, Input } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [TaskCardComponent, CommonModule],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent {
  taskStatus: string[] = ['todo', 'in-progress', 'done'];
  tasks: Task[] = [
    { id: '1', title: 'Task 10', status: 'todo', createdAt: new Date(), description: 'a new task for my todo list' },
    { id: '2', title: 'Task 2', status: 'todo', createdAt: new Date() },
    { id: '3', title: 'Task 3', status: 'in-progress', createdAt: new Date() },
    { id: '4', title: 'Task 4', status: 'done', createdAt: new Date() },
  ];

  taskMap: Map<string, Task[]> = new Map();

  ngOnInit() {
    this.groupTasksByStatus();
  }

  constructor(private dialog: MatDialog) {}

  groupTasksByStatus() {
    this.taskMap.clear();
    this.taskStatus.forEach(status => {
      this.taskMap.set(status, this.tasks.filter(task => task.status === status));
    });
  }

  openForm(task: Task | null) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      maxHeight: '90vh', // Prevents it from going off-screen
      hasBackdrop: true,
      panelClass: 'custom-dialog-container',
      disableClose: false,
      backdropClass: 'custom-backdrop',
      data: task ? { ...task } : { title: '', status: '', dueDate: '' }
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
        console.log('Task submitted:', result);
        // Handle new/edited task logic here
        this.taskMap.get(result.status)?.push(result);
      }
    });
  }
}
