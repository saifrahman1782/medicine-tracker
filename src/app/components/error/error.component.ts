import { Component, OnInit,  Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractControl } from '@angular/forms'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {

  @Input() message: string;
  @Input() field: AbstractControl;
  @Input() error: string;
  constructor() { }

  ngOnInit() {}

  shouldShowComponent() {
    if (this.field.touched && this.field.errors?.[this.error]) {
      return true;
    }
    return false;
  }
}
