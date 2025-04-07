import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import { SingleChoiceFilter } from '../../../../core/models/filter.models';

@Component({
  selector: 'app-single-choice',
  imports: [FormsModule, NgSelectComponent, NgOptionComponent],
  templateUrl: './single-choice.component.html',
  styleUrl: './single-choice.component.scss',
})
export class SingleChoiceComponent {
  config = input.required<SingleChoiceFilter>();

  onSelectionChange = output<SingleChoiceFilter['selection']>();

  protected changeSelection($event: SingleChoiceFilter['selection']) {
    this.onSelectionChange.emit($event);
  }
}
