import { Component, Input, inject } from '@angular/core';
import { Note } from '../note.model';
import { DatePipe, NgIf } from '@angular/common';
import { TruncatePipe } from '../truncate.pipe';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [NgIf, TruncatePipe, DatePipe],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent {
  private notesService = inject(NotesService)

  @Input()
  note?: Note  

  handleDeleteClick(): void {
    this.notesService.deleteNote(this.note!)  
  }
}
