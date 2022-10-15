import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'bootstrap-icons/font/bootstrap-icons.css'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bless-my-soul-website';

  constructor(private router: Router) {}
}
