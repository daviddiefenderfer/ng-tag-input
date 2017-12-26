import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

export interface AdKeyboardEvent extends KeyboardEvent {
  target: HTMLInputElement;
}

const KEYS = {
  COMMA: 188,
  ENTER: 13,
  BACKSPACE: 8,
  TAB: 9
};

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent {

  // Data
  @Input() public list: string[];
  @Input() public autocomplete: string[];
  @Input() public maxSuggestions = 5;

  // Styles
  @Input() public badgeColor = '#ffffff';
  @Input() public badgeBgColor = '#5095e5';

  // Events
  @Output() public tagAdded = new EventEmitter();
  @Output() public tagRemoved = new EventEmitter();
  @Output() public inputChanged = new EventEmitter();

  @ViewChild('input') public inputField: ElementRef;

  public checkKeyEvent(event: AdKeyboardEvent) {
    switch (event.keyCode) {
      case KEYS['COMMA']:
        event.preventDefault();
        this.checkValueAndAddTag(event);
        break;
      case KEYS['ENTER']:
        this.checkValueAndAddTag(event);
        break;
      case KEYS['BACKSPACE']:
        if (!event.target.value) {
          this.removeLastTag();
        }
        break;
      case KEYS['TAB']:
        if (!event.target.value) {
          break;
        }
        this.handleTab(event);
        break;
    }
  }

  public addTag(event: string | AdKeyboardEvent) {
    const value = (typeof event === 'string' ? event : event.target.value);

    this.list.push(this.capitalize(value));
    this.tagAdded.emit({ item: this.capitalize(value), list: this.list });
    this.inputField.nativeElement.value = '';
  }

  public removeTag(index: number) {
    this.list.splice(index, 1);
    this.tagRemoved.emit({ item: index, list: this.list });
  }

  public removeLastTag() {
    this.list.pop();
  }

  private handleTab(event: AdKeyboardEvent) {
    event.preventDefault();
    event.target.value = this.autocomplete[0] || event.target.value;
  }

  private checkValueAndAddTag(event: AdKeyboardEvent) {
    if (event.target.value) {
      this.addTag(event as AdKeyboardEvent);
    }
  }

  private capitalize(value: string) {
    return value[0].toUpperCase() + value.split('')
      .slice(1, value.length)
      .join('');
  }
}
