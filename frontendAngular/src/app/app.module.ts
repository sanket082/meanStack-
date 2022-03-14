import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AllNotesComponent } from './components/all-notes/all-notes.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BackendService } from './services/backend-service.service';
import { LoginGuard } from './guards/login-guard.guard';
import { NameFilterPipe } from './pipes/name-filter.pipe';
import { DateFilterPipe } from './pipes/date-filter.pipe';
import { ViewNoteComponent } from './components/view-note/view-note.component';

// Holds the available website routes and routing guards
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
  {path: 'notes', component: AllNotesComponent, canActivate: [LoginGuard]},
  {path: 'editNote', component: EditNoteComponent, canActivate: [LoginGuard]},
  {path: 'createNote', component: EditNoteComponent, canActivate: [LoginGuard]},
  {path: '**', redirectTo:'login'}
]

// Available components and imports
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AllNotesComponent,
    EditNoteComponent,
    NavbarComponent,
    NameFilterPipe,
    DateFilterPipe,
    ViewNoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CookieModule.forRoot()
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
