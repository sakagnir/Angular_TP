import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterService } from '../../services/character-service';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-characters-detail',
  imports: [RouterLink],
  templateUrl: './characters-detail.html',
  styleUrl: './characters-detail.scss',
})
export class CharactersDetailComponent {
  private characterService = inject(CharacterService);

  id = input.required<string>();

  character = signal<Character | null>(null);
  loading = signal(true);
  origin = signal<string | undefined>(undefined);

  ngOnInit() {
    this.characterService.getById(Number(this.id())).subscribe({
      next: c => {
        this.character.set(c);
        this.origin.update(() => c.origin?.url?.split('/').pop());
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false)
      }
    })
  }
}
