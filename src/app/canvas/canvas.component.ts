import { Component, AfterViewInit, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoxesService } from '../boxes.service';
import { DrawableBox } from '../drawable-box';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('canvasEl', { static: false }) canvas: ElementRef;

  private ctx: CanvasRenderingContext2D;
  private subscriptions: Array<Subscription>;

  constructor(private boxesService: BoxesService) { }

  ngOnInit(): void {
    this.subscriptions = [
      this.boxesService.createBoxStream.subscribe((box) => {
        this.drawBox(box);
      })
    ];
  }

  ngAfterViewInit(): void {
    this.ctx = this.getContext();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private drawBox(box: DrawableBox) {
    const {x, y, width, height, colour} = box;
    this.ctx.fillStyle = colour;
    this.ctx.fillRect(x, y, width, height);
    // this.ctx.fillStyle = label.colour;
    // this.ctx.font = '24px Muli';
    // this.ctx.textAlign = 'center';
    // this.ctx.fillText(label.text, x + (width / 2), y + (height / 2) + 10);
  }

  private  getContext(): CanvasRenderingContext2D {
    const dpr = window.devicePixelRatio || 1;
    const canvas = this.canvas.nativeElement;
    const { height, width } = canvas.getBoundingClientRect();
    canvas.height = height * dpr;
    canvas.width = width * dpr;
    canvas.style.height = `${height}px`;
    canvas.style.width = `${width}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return ctx;
  }

}
