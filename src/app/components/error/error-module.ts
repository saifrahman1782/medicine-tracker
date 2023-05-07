import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorComponent } from 'src/app/components/error/error.component'

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ErrorComponent
  ],
  declarations: [
    ErrorComponent
  ]
})
export class ErrorModule {}