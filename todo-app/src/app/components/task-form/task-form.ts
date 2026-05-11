import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],   // ← important pour [(ngModel)]
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskFormComponent {
  newTitle = '';
  @Output() add = new EventEmitter<string>();

  onSubmit() {
    if (this.newTitle.trim()) {
      this.add.emit(this.newTitle);
      this.newTitle = '';
    }
  }
}