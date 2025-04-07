import { Component, input, output } from '@angular/core';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import { MultiChoiceFilter } from '../../../../core/models/filter.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-choice',
  imports: [FormsModule, NgSelectComponent, NgOptionComponent],
  templateUrl: './multi-choice.component.html',
  styleUrl: './multi-choice.component.scss',
})
export class MultiChoiceComponent {
  config = input.required<MultiChoiceFilter>();

  onSelectionChange = output<MultiChoiceFilter['selection']>();

  protected changeSelection($event: MultiChoiceFilter['selection']) {
    this.onSelectionChange.emit($event);
  }
}
