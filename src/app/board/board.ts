import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-board',
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  columns: Column[] = [
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: '1', title: 'Research competitors', description: 'Analyze top 3 competitors in the market' },
        { id: '2', title: 'Design landing page', description: 'Create wireframes for the new landing page' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: '3', title: 'Implement login', description: 'Setup authentication using OAuth2' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: '4', title: 'Setup project repository', description: 'Initialize Git repo and configure CI/CD' },
      ],
    },
  ];

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  get connectedDropLists(): string[] {
    return this.columns.map((c) => c.id);
  }
}
