import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private server: BackendService) { }

  recentNotes = ''; // Stores a user's recent notes
  favoriteNotes = []; // Stores a user's favorite notes
  currentNote; // Stores the current selected not which is used with the view note popup component
  noteViewVisible: boolean = false; // Determines if the view note popup component should be visible

  ngOnInit(): void {
    // Get the user's 3 most recent notes
    this.server.getRecentNotes().subscribe(data => {
      this.recentNotes = data;
      for (let i = 0; i < this.recentNotes.length; i++){
        let newDate = new Date(this.recentNotes[i]['dateCreated']);
        this.recentNotes[i]['dateCreated'] = newDate.toLocaleDateString();
      }
    })

    // Get the user's favorite notes
    this.server.getFavoriteNotes().subscribe(data => {
      let temp = data;

      for (let i = 0; i < Math.ceil(temp.length / 3); i++) {
        let subTemp = [];
        for (let y = 0; y < 3; y++){
          if (temp[(i*3)+y]){
            let newDate = new Date(temp[(i*3)+y]['dateCreated']);
            temp[(i*3)+y]['dateCreated'] = newDate.toLocaleDateString();
            subTemp.push(temp[(i*3)+y]);
          }
        }
        this.favoriteNotes.push(subTemp);
      }
    })
  }

  // When a note is selected, save it to the currently selected note and show the view note component
  onClick(note) {
    // Send the note's information to the view note component
    if (note != '') {
      this.currentNote = note;
      this.noteViewVisible = true;
    }
  }

  // Hide the view not popup component
  closeNote() {
    this.noteViewVisible = false;
  }
}
