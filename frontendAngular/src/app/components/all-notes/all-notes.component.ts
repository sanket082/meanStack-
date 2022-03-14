import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.css']
})
export class AllNotesComponent implements OnInit {

  allNotes = []; // Holds all the user's notes in an array which holds arrays of notes with a max of 3 notes in the sub array
  currentNote; // Used to save which note was last selected for viewing
  noteViewVisible: boolean = false; // Determines if the view note popup component should be visible

  // Holds search/filter inputs (two way data bound)
  search = '';
  date = '';

  constructor(private server: BackendService) { }

  // Get and arrange all of the notes for the user currently logged in
  ngOnInit(): void {
    this.server.getNotes().subscribe(data => {
      let temp = data;

      // Arranges all the notes in sub arrays of 3 or less and then adds those sub arrays to the main array.
      for (let i = 0; i < Math.ceil(temp.length / 3); i++) {
        let subTemp = [];
        for (let y = 0; y < 3; y++){
          if (temp[(i*3)+y]){
            let newDate = new Date(temp[(i*3)+y]['dateCreated']);
            temp[(i*3)+y]['dateCreated'] = newDate.toLocaleDateString();
            subTemp.push(temp[(i*3)+y]);
          }
        }
        this.allNotes.push(subTemp);
      }
    });
  }

  // When a note is selected, sets the current selected note and shows the view note popup component
  onClick(note) {

    // Send the note's information to the view note component
    if (note != '') {
      this.currentNote = note;
      this.noteViewVisible = true;
    }
  }

  // Hides the view note popup component
  closeNote() {
    this.noteViewVisible = false;
  }

}
