import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgClass, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { ADD_TASK, EDIT_TASK } from '../../store/task.actions';

type TaskStatus = 'todo' | 'in-progress' | 'done';

interface TaskFormValue {
  id?: number;
  title: string;
  status: TaskStatus;
  dueDate: string;
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task | null,
    private store: Store
  ) {
    this.taskForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      status: ['todo' as TaskStatus, Validators.required],
      dueDate: ['']
    });
  }

  ngOnInit(): void {
    if (this.task) {
      this.isEditMode = true;
      this.taskForm.patchValue({
        id: this.task.id,
        title: this.task.title,
        status: this.task.status,
        dueDate: this.task.dueDate || ''
      });
    }
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    if (this.taskForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    
    try {
      const formValue: TaskFormValue = this.taskForm.value;
      
      // Ensure we always have a numeric ID
      const id = formValue.id || (this.task?.id || Date.now());
      
      const taskData: Task = {
        id: Number(id),
        title: formValue.title,
        status: formValue.status,
        dueDate: formValue.dueDate || undefined
      };

      if (this.isEditMode) {
        this.store.dispatch(EDIT_TASK({ task: taskData }));
      } else {
        this.store.dispatch(ADD_TASK({ task: taskData }));
      }
      
      this.dialogRef.close(taskData);
    } catch (error) {
      console.error('Error submitting task:', error);
      // In a real app, you might want to show an error message to the user
    } finally {
      this.isSubmitting = false;
    }
  }

  /**
   * Closes the dialog without saving changes
   */
  onCancel(): void {
    if (this.isSubmitting) {
      return;
    }
    this.dialogRef.close();
  }

  /**
   * Helper method to check if a form control has an error
   */
  hasError(controlName: string, errorType: string): boolean {
    const control = this.taskForm.get(controlName);
    return control ? control.hasError(errorType) && (control.dirty || control.touched) : false;
  }
}
