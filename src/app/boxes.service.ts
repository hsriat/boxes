import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DrawableBox } from './drawable-box';

@Injectable({
  providedIn: 'root'
})
export class BoxesService {

  toggleDialog = new Subject<boolean>();
  toggleDialogStream = this.toggleDialog.asObservable();

  createBox = new Subject<DrawableBox>();
  createBoxStream = this.createBox.asObservable();

  constructor() { }
}
