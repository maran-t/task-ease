import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FilterStatusPipe } from '../pipes/filter-status.pipe';
import { TaskCardComponent } from '../components/task-card/task-card.component';
import { FooterComponent } from '../components/footer/footer.component';
import { TaskFormComponent } from '../components/task-form/task-form.component';

@NgModule({
  declarations: [
    FilterStatusPipe,
    TaskCardComponent,
    FooterComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FilterStatusPipe,
    TaskCardComponent,
    FooterComponent,
    TaskFormComponent
  ]
})
export class SharedModule { }
