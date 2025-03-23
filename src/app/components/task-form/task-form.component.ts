import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { ADD_TASK, EDIT_TASK } from '../../store/task.actions';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  taskForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task, private store: Store) {
      this.taskForm = this.fb.group({
        id: [''],
        title: ['', Validators.required],
        status: ['todo', Validators.required],
        dueDate: ['']
      });
  }

  ngOnInit() {
    if (this.task) {
      this.isEditMode = true;
      this.taskForm.patchValue(this.task);
    }
  }

  onSubmit() {
    this.dialogRef.close(this.taskForm.value);
    this.isEditMode ? this.store.dispatch(EDIT_TASK({ task: this.taskForm.value }))
      : this.store.dispatch(ADD_TASK({ task: this.taskForm.value }));
  }

  onCancel() {
    this.dialogRef.close();
  }

}
