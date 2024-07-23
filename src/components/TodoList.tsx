import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

interface Props {
  filterBy: FilterType;
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ filterBy, todos }) => {
  const renderTodos = (filteredTodos: Todo[]) => {
    return filteredTodos.map((todo: Todo) => (
      <TodoItem key={todo.id} title={todo.title} completed={todo.completed} />
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filterBy === 'active') {
      return !todo.completed;
    } else if (filterBy === 'completed') {
      return todo.completed;
    } else {
      return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {renderTodos(filteredTodos)}
    </section>
  );
};
