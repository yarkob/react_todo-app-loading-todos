import { Todo } from './Todo';
import { TodoType } from '../types/Todo';
import { FilterType } from '../types/FilterType';

interface Props {
  filterBy: FilterType;
  todos: TodoType[];
}

export const TodoList: React.FC<Props> = ({ filterBy, todos }) => {
  const renderTodos = (filteredTodos: TodoType[]) => {
    return filteredTodos.map((todo: TodoType) => (
      <Todo key={todo.id} title={todo.title} completed={todo.completed} />
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
