import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';
import { TaskItemComponent } from '../tasks-item/tasks-item';
import { TaskFormComponent } from '../task-form/task-form';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';

type Filter = 'all' | 'active' | 'done';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, TaskFormComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskListComponent {
  private taskService = inject(TaskService);

  private filterSubject = new BehaviorSubject<Filter>('all');
  filter$ = this.filterSubject.asObservable();

  // Flux combiné : tâches + filtre
  filteredTasks$: Observable<Task[]> = combineLatest([
    this.taskService.getTasks(),
    this.filter$
  ]).pipe(
    map(([tasks, filter]) => {
      if (filter === 'active') return tasks.filter(t => !t.done);
      if (filter === 'done') return tasks.filter(t => t.done);
      return tasks;
    })
  );

  remainingTasks$: Observable<Number> = this.taskService.getTasks().pipe(
    map(tasks => tasks.filter(t => !t.done).length)
  );



  setFilter(f: Filter) { this.filterSubject.next(f); }

  onAdd(title: string) { this.taskService.addTask(title); }
  onToggle(id: number) { this.taskService.toggleTask(id); }
  onDelete(id: number) { this.taskService.deleteTask(id); }
  onClearCompleted() { this.taskService.clearCompleted(); }
}