import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private server: BackendService) { }

  currentNote; // Holds information on the current note being edited. Allowing the edit note page to be populated
  noteForm; // Form used for editing/creating a note

  // Initialize the current note data using the backend service, then setup the page's form
  ngOnInit(): void {
    this.currentNote = this.server.currentNote;

    this.noteForm = this.formBuilder.group({
      title: [this.currentNote['title'], [Validators.required, Validators.maxLength(120)]],
      body: [this.currentNote['body'], [Validators.required, Validators.maxLength(10000)]],
      favorite: [this.currentNote['important']]
    });
  }

  // Triggered when the note is saved
  onSave() {
    // Determine if the note should be favorited.
    let fav = false;
    if (this.noteForm.get('favorite').value == true) {fav = true;}

    // Check if the currentNote (which holds the initially passed date for populating the form) actually
    // had anything in it. If it didn't then the page is being used to create a new note.
    // If it did, then the page is being used to update an existing note.
    if (this.currentNote['title'] == '') {
      let body = {
        title: this.noteForm.get('title').value,
        body: this.noteForm.get('body').value,
        important: fav
      }
      
      // Create a new note
      this.server.createNote(body).subscribe(data => {
        alert('Note has been saved.');
        this.server.resetCurrentNote();
        this.router.navigate(['home']);
      })
    } else {
      let body = {
        id: this.currentNote['_id'],
        title: this.noteForm.get('title').value,
        body: this.noteForm.get('body').value,
        important: fav
      }

      // Update existing note
      this.server.updateNote(body).subscribe(data => {
        alert('Note has been updated.');
        this.server.resetCurrentNote();
        this.router.navigate(['home']);
      });
    }
  }

  // Triggered when the cancel button is clicked
  onCancel() {
    this.router.navigate(['home']);
  }

}
