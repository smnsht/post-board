import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Note } from '../note.model';

@Component({
  selector: 'app-note-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-dialog.component.html',
  styleUrl: './note-dialog.component.scss'
})
export class NoteDialogComponent {  
  @Output()
  closeClicked = new EventEmitter()

  @Output()
  createNoteClicked = new EventEmitter<Note>()

  form = new FormGroup({
    author: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required])
  })

  handleClose(): void {
    this.closeClicked.emit()
  }

  handleSave(): void {
    const value = this.form.value
    console.log(value)
    this.createNoteClicked.emit({
      author: value.author!,
      content: value.content!,
      touched_at: new Date()
    })
  }
}
