import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from './notes.service';
import { LoaderComponent } from './loader/loader.component';
import { BehaviorSubject } from 'rxjs';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { Note } from './note.model';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    LoaderComponent,
    NoteCardComponent,
    NoteDialogComponent    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {  
  private notesService = inject(NotesService)
  private dialogSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.notesService.loading$
  notes$ = this.notesService.notes$  
  showDialog$ = this.dialogSubject.asObservable();
  title = 'post-board';

  ngOnInit(): void {
    this.notesService.getNotes();    
  }

  showDialog(): void {
    this.dialogSubject.next(true)
  }

  closeDialog(): void {
    this.dialogSubject.next(false)
  }

  createNote(note: Note): void {
    this.dialogSubject.next(false)
    this.notesService.createNote(note)
  }
}
