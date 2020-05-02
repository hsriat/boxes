import { Component, OnInit } from '@angular/core';

import { BoxesService } from '../boxes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private boxesService: BoxesService) { }

  ngOnInit(): void {
  }

  public onAddClick() {
    this.boxesService.toggleDialog.next(true);
  }
}
