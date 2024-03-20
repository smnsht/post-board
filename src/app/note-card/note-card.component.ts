import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Note } from '../note.model';
import { DatePipe, NgIf } from '@angular/common';
import { TruncatePipe } from '../truncate.pipe';
import { NotesService } from '../notes.service';


@Component({
  selector: 'app-note-card-wrapper',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [    
    'fieldset { border: 1px solid black; padding: 1em; margin: 1em; }',
    ':host ::ng-deep legend { border: 1px solid black; padding: .2em; }'    
  ],  
  template: `
    <div>
      <fieldset>	
        <ng-content select="legend"></ng-content>
        <ng-content></ng-content>
      </fieldset>
    </div>
  `
})
export class NoteCardWrapperComponent {}



@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [
    NgIf, 
    TruncatePipe, 
    DatePipe, 
    NoteCardWrapperComponent
  ],
  templateUrl: './note-card.component.html'  
})
export class NoteCardComponent {
  private notesService = inject(NotesService)

  @Input()
  note?: Note  

  handleDeleteClick(): void {
    this.notesService.deleteNote(this.note!)  
  }
}
