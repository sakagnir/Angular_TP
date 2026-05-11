import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './tasks-item.html',
  styleUrl: './tasks-item.scss'
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onToggle() {
    this.toggle.emit(this.task.id);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }
}