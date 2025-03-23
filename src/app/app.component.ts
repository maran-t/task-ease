import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskBoardComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-ease';
}
