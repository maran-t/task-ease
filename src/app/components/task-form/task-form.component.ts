import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  // @Input() task: Task | null = null;
  @Output() submitTask = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  taskForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      status: ['todo', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    // if (this.task) {
    //   this.isEditMode = true;
    //   this.taskForm.patchValue(this.task);
    // }
  }

  onSubmit() {
    if (!this.taskForm.valid) {
      alert('Please fill in all required fields.');
      return;
    }
    const formValue = this.taskForm.value;
    this.submitTask.emit({ ...this.task, ...formValue });
    this.dialogRef.close(this.taskForm.value);
  }

  onCancel() {
    this.dialogRef.close();
  }


}
