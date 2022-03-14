import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { BackendService } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private server: BackendService, private cookie: CookieService, private router: Router) { }

  wrongPassword = false; // Used to determine if a wrong password was entered while loggin in

  // Form for loggin into the website
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  // Triggered when logging in
  onLogin(){
    // Remove the current cookie storing the login session.
    this.cookie.removeAll();

    let body = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }

    // Call to the server to login and send a new login session cookie to the user
    this.server.login(body).subscribe(data=>{
      this.wrongPassword = false;
      this.router.navigate(['home']);
    }, (error) => { // If login failed, then let the user know by setting the wrong password variable
      if (error.status == 422){
        this.wrongPassword = true;
      }
    });
  }
}
