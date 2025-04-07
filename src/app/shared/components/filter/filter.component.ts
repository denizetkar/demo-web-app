import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  DateRangeFilter,
  Filter,
  MultiChoiceFilter,
  SingleChoiceFilter,
} from '../../../core/models/filter.models';
import { DateRangeComponent } from './date-range/date-range.component';
import { MultiChoiceComponent } from './multi-choice/multi-choice.component';
import { SingleChoiceComponent } from './single-choice/single-choice.component';

@Component({
  selector: 'app-filter',
  imports: [
    MatIconModule,
    SingleChoiceComponent,
    MultiChoiceComponent,
    DateRangeComponent,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  protected readonly configs: Filter[] = [
    {
      type: 'single-choice',
      label: 'Single choice 1',
      options: [
        {
          idx: 0,
          label: 'Option 1',
          value: 'val1',
        },
        {
          idx: 1,
          label: 'Option 2',
          value: 'val2',
        },
        {
          idx: 2,
          label: 'Option 3',
          value: 'val3',
        },
      ],
      selection: undefined,
    },
    {
      type: 'multi-choice',
      label: 'Multi choice 1',
      options: [
        {
          idx: 0,
          label: 'Option 1',
          value: 'val1',
        },
        {
          idx: 1,
          label: 'Option 2',
          value: 'val2',
        },
        {
          idx: 2,
          label: 'Option 3',
          value: 'val3',
        },
      ],
      selection: [],
    },
    {
      type: 'multi-choice',
      label: 'Multi choice 2 - with a long label',
      options: [
        {
          idx: 0,
          label: 'Option 4',
          value: 'val4',
        },
        {
          idx: 1,
          label: 'Option 5',
          value: 'val5',
        },
      ],
      selection: [],
    },
  ];

  protected readonly SINGLE_CHOICE_TYPE: SingleChoiceFilter['type'] =
    'single-choice';
  protected readonly MULTI_CHOICE_TYPE: MultiChoiceFilter['type'] =
    'multi-choice';
  protected readonly DATE_RANGE_TYPE: DateRangeFilter['type'] = 'date-range';

  protected onSelectionChange($event: Filter['selection'], idx: number) {
    this.configs[idx].selection = $event;
  }
  protected applyFilters() {
    console.log('apply filters...');
  }
  protected resetFilters() {
    console.log('reset filters...');
  }
}
