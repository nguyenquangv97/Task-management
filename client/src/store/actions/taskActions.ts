import { Task, Stages } from '../../data';

export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK_STAGE = 'UPDATE_TASK_STAGE';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_IMPORTANT = 'TOGGLE_IMPORTANT';
export const UPDATE_TASK_LIST = 'UPDATE_TASK_LIST';

export const addTask = (task: Task) => ({
  type: ADD_TASK,
  payload: task,
});

export const updateTaskStage = (taskId: string, stage: Stages) => ({
  type: UPDATE_TASK_STAGE,
  payload: { taskId, stage },
});

export const deleteTask = (taskId: string) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const toggleImportant = (taskId: string) => ({
  type: 'TOGGLE_IMPORTANT',
  payload: taskId,
});

export const updateTaskList = (tasks: Task[]) => ({
  type: UPDATE_TASK_LIST,
  payload: tasks,
});
