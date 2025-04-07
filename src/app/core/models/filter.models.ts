export interface FilterBase<S> {
  type: string;
  label: string;
  selection: S;
}

export interface Option<T> {
  // The index of the option in the list, needed by `@ng-select/ng-select`.
  idx: number;
  label: string;
  value: T;
}

export interface ChoiceFilter<T, S> extends FilterBase<S> {
  options: Option<T>[];
}

export interface SingleChoiceFilter extends ChoiceFilter<string, number> {
  type: 'single-choice';
}

export interface MultiChoiceFilter extends ChoiceFilter<string, number[]> {
  type: 'multi-choice';
}

export interface DateRangeFilter
  extends FilterBase<{ start?: Date; end?: Date }> {
  type: 'date-range';

  minDate?: Date;
  maxDate?: Date;
}

export type Filter = SingleChoiceFilter | MultiChoiceFilter | DateRangeFilter;
