import { Component } from '@angular/core';

@Component({
  selector: 'app-mini-project',
  templateUrl: './mini-project.component.html',
  styleUrls: ['./mini-project.component.css']})
export class MiniProjectComponent {

  logout() {
    alert("Logout Successful");
    sessionStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  }
}

