import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { TagInputComponent } from './components/tag-input';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [ TagInputComponent ],
  exports:      [ TagInputComponent ]
})
export class TagInputModule { }
