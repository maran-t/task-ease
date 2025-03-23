import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private dialog: MatDialog) { }

  getTasks(): Promise<Task[]> {
    return new Promise((resolve) => {
      const tasks: Task[] = [
        { id: 1, title: 'Task 10', status: 'todo', dueDate: '2025-04-05' },
        { id: 2, title: 'Task 2', status: 'in-progress', dueDate: '2025-03-30' },
        { id: 3, title: 'Task 3', status: 'done', dueDate: '2025-03-10' },
        { id: 4, title: 'Task 4', status: 'todo', dueDate: '2025-03-30' },
      ]

      resolve(tasks);
    });
  }

  showTaskDialog(task: Task | null) {
    this.dialog.open(TaskFormComponent, {
      maxHeight: '90vh',
      hasBackdrop: true,
      panelClass: 'custom-dialog-container',
      disableClose: false,
      backdropClass: 'custom-backdrop',
      data: task ? { ...task } : null
    });
  }
}
