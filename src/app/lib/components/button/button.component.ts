import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label = 'Submit';
  @Input() color = 'primary';
  @Input() disabled = false;
  @Output() submitEvent = new EventEmitter();

  submit() {
    this.submitEvent.emit();
  }

}
