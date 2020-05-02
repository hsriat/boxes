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
  public newBox: DrawableBox;

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
    this.newBox = { ...this.defaultBox };
    this.isVisible = false;
  }

  public hideDialogue(action: boolean) {
    if (action) {
      this.boxesService.createBox.next(this.newBox);
    }
    this.reset();
  }

}
