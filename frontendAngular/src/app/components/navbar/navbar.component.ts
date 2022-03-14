import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
  }

  // If the user logs out, then remove their login session cookie
  onLogout() {
    this.cookie.removeAll();
  }

}
