import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  // Holds a note which is ready to be edited. This variable is used to determine if the Edit Note component
  // should populate the fields so that a note can be updated, or if it should leave fields blank so a new
  // note can be created.
  currentNote = {
    _id: '',
    title: '',
    dateCreated: '',
    body: '',
    important: '',
    userId: ''
  }

  // Reset currentNote to be empty (indicating that a new note is ready to be created)
  resetCurrentNote() {
    this.currentNote = {
      _id: '',
      title: '',
      dateCreated: '',
      body: '',
      important: '',
      userId: ''
    }
  }

  // Set a specific currentNote (inidcating that a note is ready to be updated)
  updateCurrentNote(currentNote) {
    this.currentNote = currentNote;
  }

  // Register new user
  register(data): Observable<any> {
    return this.http.post('http://localhost:3000/api/register', data, {withCredentials: true});
  }

  // Login with existing user
  login(data): Observable<any> {
    return this.http.post('http://localhost:3000/api/login', data, {withCredentials: true});
  }

  // Get all notes
  getNotes(): Observable<any> {
    let _headers = new HttpHeaders().set('Content-Type', 'Application/JSON').append('token', this.cookie.get('token').valueOf());
    return this.http.get('http://localhost:3000/api/notes/all', {headers: _headers, withCredentials: true});
  }

  // Get recent notes
  getRecentNotes(): Observable<any> {
    let _headers = new HttpHeaders().set('Content-Type', 'Application/JSON').append('token', this.cookie.get('token').valueOf());
    return this.http.get('http://localhost:3000/api/notes/recent', {headers: _headers, withCredentials: true});
  }

  // Get favorite notes
  getFavoriteNotes(): Observable<any> {
    let _headers = new HttpHeaders().set('Content-Type', 'Application/JSON').append('token', this.cookie.get('token').valueOf());
    return this.http.get('http://localhost:3000/api/notes/important', {headers: _headers, withCredentials: true});
  }

  // Create a new note
  createNote(data): Observable<any> {
    let _headers = new HttpHeaders().set('Content-Type', 'Application/JSON').append('token', this.cookie.get('token').valueOf());
    return this.http.post('http://localhost:3000/api/notes', data, {headers: _headers, withCredentials: true});
  }

  // Delete a note
  deleteNote(data): Observable<any> {
    let _headers = new HttpHeaders().set('Content-Type', 'Application/JSON').append('token', this.cookie.get('token').valueOf());
    return this.http.post('http://localhost:3000/api/notes/note/delete', data, {headers: _headers, withCredentials: true});
  }

  // Update a note in the database
  updateNote(data): Observable<any> {
    let _headers = new HttpHeaders().set('Content-Type', 'Application/JSON').append('token', this.cookie.get('token').valueOf());
    return this.http.post('http://localhost:3000/api/notes/note/update', data, {headers: _headers, withCredentials: true});
  }
}
