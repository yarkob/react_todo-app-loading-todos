/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FormEvent, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { FilterType } from './types/FilterType';
import { TodoType } from './types/Todo';
import cs from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.All);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let timerId = 0;

    getTodos()
      .catch(dataError => {
        if (dataError) {
          setError(dataError);

          timerId = window.setTimeout(() => {
            setError('');
          }, 3000);

          throw new Error(dataError);
        }

        return dataError;
      })
      .then(data => setTodos(data));

    clearTimeout(timerId);
    setIsSubmitted(false);
  }, [isSubmitted]);

  console.log(todos);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setIsSubmitted(true);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList filterBy={filterBy} todos={todos} />

        {/* Hide the footer if there are no todos */}
        {todos.length && (
          <Footer setFilterBy={setFilterBy} filterBy={filterBy} todos={todos} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cs(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {error && (
          <div>
            Unable to load todos
            <br />
          </div>
        )}
        {/*Title should not be empty*/}
        {/*<br />*/}
        {/*Unable to add a todo*/}
        {/*<br />*/}
        {/*Unable to delete a todo*/}
        {/*<br />*/}
        {/*Unable to update a todo*/}
      </div>
    </div>
  );
};
