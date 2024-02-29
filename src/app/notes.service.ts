import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';
import { Note } from './note.model';

const STORAGE_KEY = 'InfraEdge/Simon/Notes';

function compareFn(a: Note, b: Note): number {  
  const aStr = a.touched_at?.toString()
  const bStr = b.touched_at?.toString()

  try {
    return aStr.localeCompare(bStr)
  } catch(e) {
    console.warn(e)
    return 0
  }  
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private notesSubject = new BehaviorSubject<Note[]>([]);

  public readonly loading$ = this.loadingSubject.asObservable();
  public readonly notes$ = this.notesSubject.asObservable();

  constructor() { 
    // for the sake of home task only
    if (!localStorage.getItem(STORAGE_KEY)) {
      this.seedNotes();
    }
  }
  
  public getNotes(): void {
    this.loadingSubject.next(true);
    
    of(this.loadNotes()).pipe(
      delay(1000),   // simulate delay in server communication
      tap((notes) => {        
        this.loadingSubject.next(false)
        this.notesSubject.next(notes)
      })
    ).subscribe()
  }

  public createNote(note: Note): void {
    this.loadingSubject.next(true)

    let newNote = Object.assign({}, note, {
      'touched_at': new Date(),
      'id': crypto.randomUUID()
    })

    let updatedNotes = [
      ...this.loadNotes(),
      newNote
    ].sort(compareFn)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes))

    of(updatedNotes).pipe(
      delay(1000), // simulate delay in server communication
      tap((notes) => {
        this.loadingSubject.next(false)
        this.notesSubject.next(notes)
      })
    )
    .subscribe()
  }

  public deleteNote(note: Note): void {
    this.loadingSubject.next(true);

    let allButGiven = this
      .loadNotes()
      .filter(target => target.id != note.id)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(allButGiven))

    of(allButGiven).pipe(
      delay(1000), // simulate delay in server communication
      tap((notes) => {
        this.loadingSubject.next(false)
        this.notesSubject.next(notes)
      })
    ).subscribe()
  }

  private loadNotes(): Note[] {
    let itemsString = localStorage.getItem(STORAGE_KEY)
    if (itemsString) {
      let notes = <Note[]>JSON.parse(itemsString);
      notes.sort(compareFn)
      return notes;
    }
    return []
  }

  private seedNotes(): void {
    const seedData: Note[] = [
      {
        id: crypto.randomUUID(),
        author: 'ADAMS, HENRY',
        content: '(1838-1918). Essayist and autobiographer, author of The Education of Henry Adams, scion of the famous Adams family.',
        touched_at: new Date('1838-01-01')
      },
      {
        id: crypto.randomUUID(),
        author: 'BRYANT, WILLIAM CULLEN',
        content: ' (1794-1878). New England-born nature poet, author of the poems "Thanatopsis" and "To a Water-fowl," and long-time editor of the New York Evening Post.',
        touched_at: new Date('1794-01-01')
      },
      {
        id: crypto.randomUUID(),
        author: 'CHESNUTT, CHARLES WADDELL',
        content: '(1858-1932). African American novelist and story writer.',
        touched_at: new Date('1858-01-01')
      },
      {
        id: crypto.randomUUID(),
        author: 'COOPER, JAMES FENIMORE',
        content: '(1789-1851). Prolific and popular American novelist, author of the Leatherstocking Tales.',
        touched_at: new Date('1789-10-10')
      },
      {
        id: crypto.randomUUID(),
        author: 'CRANE, STEPHEN',
        content: '(1871-1900). American author of realistic novels and stories, best known for the Civil War novel The Red Badge of Courage.',
        touched_at: new Date('1871-10-10')
      },
      {
        id: crypto.randomUUID(),
        author: 'DOUGLASS, FREDERICK',
        content: '(1818-1895). An African American born a slave, a writer, journalist, autobiographer, race leader, abolitionist. Author of Narrative of the Life of Frederick Douglass, an American Slave.',
        touched_at: new Date('1818-10-10')
      },
      {
        id: crypto.randomUUID(),
        author: 'DUNBAR, PAUL LAURENCE',
        content: '(1872-1906). Nineteenth-century African American poet, considered the first important Black poet in America.',
        touched_at: new Date('1872-10-10')
      },
      {
        id: crypto.randomUUID(),
        author: 'EMERSON, RALPH WALDO',
        content: '(1803-1882). Major American essayist, speaker, and poet. Unitarian and transcendentalist, associated with Boston.',
        touched_at: new Date('1803-10-10')
      },
      {
        id: crypto.randomUUID(),
        author: 'HARRIS, JOEL CHANDLER',
        content: '(1848-1908). White southern journalist who created folk tales about African American slaves in the pre-Civil War south, author of the Uncle Remus tales.',
        touched_at: new Date('1848-10-10')
      },
      {
        id: crypto.randomUUID(),
        author: 'SIMON, SIMON',
        content: '(1977-PRESENT). Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
        touched_at: new Date('1848-10-10')
      },
    ];

    seedData.forEach(node => node.content += ".Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum")

    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData))
  }
}
