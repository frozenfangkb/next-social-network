import { ToDoSchema } from '@/modules/todo/api/types.ts';
import { ToDo } from '@/modules/todo/models/todo.ts';


/**
 * Converts a ToDoSchema object to a ToDo object by casting.
 *
 * This function is designed to adapt an object adhering to the ToDoSchema interface
 * into an object adhering to the ToDo interface. It uses a simple type assertion
 * to perform this transformation and does not perform any runtime checks or modifications.
 *
 * @param {ToDoSchema} todo - The ToDoSchema object to be adapted to the ToDo model.
 * @returns {ToDo} The adapted object in the ToDo model format.
 */
export const adaptTodoSchemaToModel = (todo: ToDoSchema): ToDo => todo as ToDo;
