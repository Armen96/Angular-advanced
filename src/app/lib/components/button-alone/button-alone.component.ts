import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialUiModule} from "../../material/material-ui.module";

@Component({
  selector: 'app-button-alone',
  standalone: true,
  imports: [CommonModule, MaterialUiModule],
  templateUrl: './button-alone.component.html',
  styleUrls: ['./button-alone.component.scss']
})
export class ButtonAloneComponent {
  @Input() label = 'Submit';
  @Input() color = 'primary';
  @Input() disabled = false;
  @Output() submitEvent = new EventEmitter();

  submit() {
    this.submitEvent.emit();
  }
}
