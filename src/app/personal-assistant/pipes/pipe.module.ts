import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FromNowPipe } from './from-now.pipe';
import { ShortenPipe } from './shorten.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FromNowPipe,
    ShortenPipe,
  ],
  exports: [
    FromNowPipe,
    ShortenPipe,

  ]
})
export class PipeModule {}
