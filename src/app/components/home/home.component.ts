import { Component, OnInit } from '@angular/core';
import { fader, slideDown } from 'src/app/helpers/animations/fade.animation'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fader, slideDown]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
