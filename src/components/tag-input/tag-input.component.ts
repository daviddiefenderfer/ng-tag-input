import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

const KEYS = {
  COMMA: 188,
  ENTER: 13,
  BACKSPACE: 8,
  TAB: 9
};

export interface TagInputEvent {
  item: any;
  list: any[];
}

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.css']
})
export class TagInputComponent {

  // Data
  @Input() public list: any[];
  @Input() public listKey: string;
  @Input() public autocomplete: any[];
  @Input() public autocompleteKey: string;
  @Input() public maxSuggestions = 5;

  // Styles
  @Input() public badgeColor = '#ffffff';
  @Input() public badgeBgColor = '#5095e5';

  // Events
  @Output() public tagAdded = new EventEmitter<TagInputEvent>();
  @Output() public tagRemoved = new EventEmitter<TagInputEvent>();
  @Output() public inputChanged = new EventEmitter<string>();

  @ViewChild('input') public inputField: ElementRef;
  @ViewChild('tags') public tagsEl: ElementRef;

  private get autocompleteName() {
    return this.autocomplete[0][this.autocompleteKey] || this.autocomplete[0];
  }

  private get lastTag(): HTMLElement {
    return [].slice.call(this.tagsEl.nativeElement.getElementsByClassName('tag'))
      .pop() as HTMLElement;
  }

  public checkKeyEvent(event: any) {
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

  public addTag(tag: any) {
    if (this.lastTag) {
      this.lastTag.classList.remove('selected-tag');
    }

    this.list.push(tag);
    this.tagAdded.emit({ item: tag, list: this.list });
    this.inputField.nativeElement.value = '';
  }

  public removeTag(index: number) {
    this.list.splice(index, 1);
    this.tagRemoved.emit({ item: index, list: this.list });
  }

  public removeLastTag() {
    if (!this.lastTag) {
      return;
    }

    if (this.lastTag.classList.contains('selected-tag')) {
      this.list.pop();
    } else {
      this.lastTag.classList.add('selected-tag');
    }
  }

  public hasValues(array: any[]) {
    return array.filter(((i: any) => i));
  }

  private handleTab(event: any) {
    event.preventDefault();

    if (!this.autocomplete || !this.autocomplete.length) {
      this.addTag(event.target.value);
      return;
    }

    if (this.autocompleteName === event.target.value) {
      this.addTag(this.autocomplete[0]);
    } else {
      event.target.value = this.autocompleteName;
    }

    return;
  }

  private checkValueAndAddTag(event: any) {
    if (this.autocomplete && this.autocomplete.length && this.autocompleteName === event.target.value) {
      this.addTag(this.autocomplete[0]);
      return;
    }

    if (event.target.value) {
      this.addTag(event.target.value);
    }
  }
}
