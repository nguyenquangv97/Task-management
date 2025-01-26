import { initialTasks } from '../../data';
import {
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_IMPORTANT,
  UPDATE_TASK_LIST,
  UPDATE_TASK_STAGE,
} from '../actions/taskActions';

const initialState = {
  newTasks: initialTasks.filter((task) => task.stage === 'new'),
  inProgressTasks: initialTasks.filter((task) => task.stage === 'inProgress'),
  doneTasks: initialTasks.filter((task) => task.stage === 'done'),
};

const tasksReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        newTasks: [action.payload, ...state.newTasks],
      };
    case UPDATE_TASK_STAGE:
      const { taskId, stage } = action.payload;
      const task =
        state.newTasks.find((task) => task.id === taskId) ||
        state.inProgressTasks.find((task) => task.id === taskId) ||
        state.doneTasks.find((task) => task.id === taskId);

      if (task) {
        task.stage = stage;
        const updatedTasks = {
          newTasks:
            stage === 'new'
              ? [task, ...state.newTasks.filter((task) => task.id !== taskId)]
              : state.newTasks.filter((task) => task.id !== taskId),
          inProgressTasks:
            stage === 'inProgress'
              ? [
                  task,
                  ...state.inProgressTasks.filter((task) => task.id !== taskId),
                ]
              : state.inProgressTasks.filter((task) => task.id !== taskId),
          doneTasks:
            stage === 'done'
              ? [task, ...state.doneTasks.filter((task) => task.id !== taskId)]
              : state.doneTasks.filter((task) => task.id !== taskId),
        };
        return {
          ...state,
          ...updatedTasks,
        };
      }
      return state;
    case DELETE_TASK:
      const id = action.payload;
      return {
        ...state,
        newTasks: state.newTasks.filter((task) => task.id !== id),
        inProgressTasks: state.inProgressTasks.filter((task) => task.id !== id),
        doneTasks: state.doneTasks.filter((task) => task.id !== id),
      };

    case TOGGLE_IMPORTANT:
      const currentTaskId = action.payload;
      const updatedTasks = {
        newTasks: state.newTasks.map((task) =>
          task.id === currentTaskId
            ? { ...task, important: !task.important }
            : task
        ),
        inProgressTasks: state.inProgressTasks.map((task) =>
          task.id === currentTaskId
            ? { ...task, important: !task.important }
            : task
        ),
        doneTasks: state.doneTasks.map((task) =>
          task.id === currentTaskId
            ? { ...task, important: !task.important }
            : task
        ),
      };
      return {
        ...state,
        ...updatedTasks,
      };

    case UPDATE_TASK_LIST:
      const { newTasks, inProgressTasks, doneTasks } = action.payload;
      return {
        ...state,
        newTasks,
        inProgressTasks,
        doneTasks,
      };

    default:
      return state;
  }
};

export default tasksReducer;
