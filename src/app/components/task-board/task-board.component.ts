import { Component } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FilterStatusPipe } from '../../pipes/filter-status.pipe';
import { Store } from '@ngrx/store';
import { getTasks } from '../../store/task.selectors';
import { TasksService } from '../../tasks.service';
import { LOAD_TASK } from '../../store/task.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [TaskCardComponent, CommonModule, FilterStatusPipe, MatProgressSpinnerModule],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent {
  status: string[] = ['todo', 'in-progress', 'done'];
  tasks: Task[] = [];
  isLoading = true;

  constructor(private store: Store, private taskService: TasksService) {}

  ngOnInit() {
    this.store.select(getTasks).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
    this.taskService.getTasks().then((tasks: Task[]) => {
      this.store.dispatch(LOAD_TASK({ tasks }));
      this.isLoading = false;
    });
  }

  openForm(task: Task | null) {
    this.taskService.showTaskDialog(task);
  }
}
