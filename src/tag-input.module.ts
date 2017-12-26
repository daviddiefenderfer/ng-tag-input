import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {TagInputComponent} from './components/tag-input/tag-input.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ TagInputComponent ],
  exports:      [ TagInputComponent ]
})
export class TagInputModule { }
