import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend-service.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private server: BackendService, private cookie: CookieService, private router: Router) { }

  // Form for registering a new user
  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['']
  }, {
    validators: this.passwordMatchValidator()
  });

  ngOnInit(): void {
  }

  // Triggered when the user clicks the register button
  onRegister() {
    // Remove any current login session cookies
    this.cookie.removeAll();

    let body = {
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value
    }

    // Register the user
    this.server.register(body).subscribe(data=>{
      if (data) {
        // Login the user for them
        this.server.login(body).subscribe(data=>{
          this.router.navigate(['home']);
        }, (error) => {
          this.router.navigate(['login']);
        });
      }        
    }, (error) => { // If the username already exists, let the new user know
      alert('User already exists.');
    });
  }

  // Validator function used in the html to validate the password and confirmPassword fields
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      let error = {};

      // Check for matching passwords
      if (control.value.password != control.value.confirmPassword){
        error = {'matchingError': true};
      }
      return error;
    }
  }
}
