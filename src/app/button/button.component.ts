import { Component, OnInit } from '@angular/core';

import { BoxesService } from '../boxes.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor(private boxesService: BoxesService) { }

  ngOnInit(): void {
  }

  public onAddClick() {
    this.boxesService.toggleDialog.next(true);
  }
}
