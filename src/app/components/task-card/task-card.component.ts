import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() tasks: any;
  @Input() status!: string;

  constructor(private dialog: MatDialog) {
    console.log('TaskCardComponent initialized', this.tasks, this.status);
  }

  // openForm(task: Task | null, status: any) {
  //   const dialogRef = this.dialog.open(TaskFormComponent, {
  //     maxHeight: '90vh', // Prevents it from going off-screen
  //     hasBackdrop: true,
  //     panelClass: 'custom-dialog-container',
  //     disableClose: false,
  //     backdropClass: 'custom-backdrop',
  //     data: task ? { ...task } : { title: '', status, dueDate: '' }
  //   });

  //   dialogRef.afterClosed().subscribe((result: Task) => {
  //     if (result) {
  //       console.log('Task submitted:', result);
  //       // Handle new/edited task logic here
  //       this.tasks.push(result);
  //     }
  //   });
  // }

}
