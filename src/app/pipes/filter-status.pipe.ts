import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'filterStatus',
  standalone: true
})
export class FilterStatusPipe implements PipeTransform {

  transform(value: Task[], status: string): Task[] {
    return value.filter((v: any) => v.status === status);
  }

}
