import { Component, Input, OnInit } from '@angular/core';
import { fader } from 'src/app/helpers/animations/fade.animation'
import { PlaceholderType } from 'src/app/helpers/enums/placeholder-type'

@Component({
  selector: 'app-placeholder-object',
  templateUrl: './placeholder-object.component.html',
  styleUrls: ['./placeholder-object.component.css'],
  animations: [fader]
})
export class PlaceholderObjectComponent implements OnInit {

  @Input() type: PlaceholderType = PlaceholderType.Category
  placeHolderTypes = PlaceholderType
  
  constructor() { }

  ngOnInit(): void {
  }

}
