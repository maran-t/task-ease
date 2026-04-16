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
  taskId: string;
  title: string;
  description: string;
  tag: string;
  priority: 'low' | 'medium' | 'high';
  avatar: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
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
      color: 'bg-slate-400',
      tasks: [
        {
          id: '1',
          taskId: 'TSK-101',
          title: 'Research competitors',
          description: 'Analyze top 3 competitors in the market',
          tag: 'Research',
          priority: 'medium',
          avatar: 'https://i.pravatar.cc/150?u=1'
        },
        {
          id: '2',
          taskId: 'TSK-102',
          title: 'Design landing page',
          description: 'Create high-fidelity wireframes for the new landing page',
          tag: 'Design',
          priority: 'high',
          avatar: 'https://i.pravatar.cc/150?u=2'
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-blue-500',
      tasks: [
        {
          id: '3',
          taskId: 'TSK-103',
          title: 'Implement login auth',
          description: 'Setup authentication using OAuth2 and JWT',
          tag: 'Backend',
          priority: 'high',
          avatar: 'https://i.pravatar.cc/150?u=3'
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-emerald-500',
      tasks: [
        {
          id: '4',
          taskId: 'TSK-104',
          title: 'Setup repository',
          description: 'Initialize Git repo and configure CI/CD pipelines',
          tag: 'DevOps',
          priority: 'low',
          avatar: 'https://i.pravatar.cc/150?u=4'
        },
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
