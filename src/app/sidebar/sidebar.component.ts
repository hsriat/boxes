import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoxesService } from '../boxes.service';
import { DrawableBox } from '../drawable-box';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public isVisible = false;
  private defaultBox: DrawableBox = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    colour: '#d05d51'
  };

  public x: string;
  public y: string;
  public height: string;
  public width: string;
  public colour: string;

  private subscriptions: Array<Subscription>;

  constructor(private boxesService: BoxesService) { }

  ngOnInit(): void {
    this.reset();
    this.subscriptions = [
      this.boxesService.toggleDialogStream.subscribe((flag) => {
        this.isVisible = flag;
      })
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public reset(): void {
    const { x, y, height, width, colour } = this.defaultBox;
    this.x = x.toString();
    this.y = y.toString();
    this.height = height.toString();
    this.width = width.toString();
    this.colour = colour;
    this.isVisible = false;
  }

  public hideDialogue(action: boolean) {
    if (action) {
      const { x, y, width, height, colour } = this;
      this.boxesService.createBox.next({
        x: parseInt(x, 10),
        y: parseInt(y, 10),
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        colour
      });
    }
    this.reset();
  }

}
