import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.css']
})
export class ViewNoteComponent implements OnInit {

  constructor(private server: BackendService, private router: Router) { }

  @Input() note; // Data bound variable that holds the data of the note being viewed
  @Output() closeNote = new EventEmitter(); // Data bound event used to hide the view note component

  ngOnInit(): void {
  }

  // Emit the closeNote event if the user clicks the 'x' button
  onClose() {
    this.closeNote.emit();
  }

  // Trigered when the user clicks the edit button to edit the note being viewed
  edit() {
    // Call to the backend service to save the current note that is being viewed
    this.server.updateCurrentNote(this.note);
    // After saving the data of the note that is about to be edited, navigate to the page to edit a note
    this.router.navigate(['editNote']);
  }

  // Triggered wehn the user clicks the delete button to delete the note being viewed
  del() {
    // Delete the note
    this.server.deleteNote({id: this.note['_id']}).subscribe(data=>{
      alert("Deleted '"+data['title']+"'!")
    });
    // Hide the note view popup component
    this.onClose();
    // Reload the page to update the notes that exist under the user.
    location.reload();
  }
}
