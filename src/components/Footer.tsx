import React, { Dispatch, SetStateAction } from 'react';
import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';
import cs from 'classnames';

interface Props {
  setFilterBy: Dispatch<SetStateAction<FilterType>>;
  filterBy: FilterType;
  todos: Todo[];
}

export const Footer: React.FC<Props> = ({ setFilterBy, filterBy, todos }) => {
  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cs('filter__link', {
            selected: filterBy === FilterType.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterBy(FilterType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cs('filter__link', {
            selected: filterBy === FilterType.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterBy(FilterType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cs('filter__link', {
            selected: filterBy === FilterType.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterBy(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
