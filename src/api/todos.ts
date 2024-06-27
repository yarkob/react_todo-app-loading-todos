import { TodoType } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 836;

export const getTodos = () => {
  return client.get<TodoType[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
