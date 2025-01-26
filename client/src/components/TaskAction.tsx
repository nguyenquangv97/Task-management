import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Stages, stages, Task } from '@/data';
import { RootState } from '@/store';
import { MoreHorizontal, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { deleteTask, updateTaskStage } from '../store/actions/taskActions';

const socket = io('http://localhost:8000');

interface TaskActionProps {
  task: Task;
}

const stageMap = {
  new: 'New',
  inProgress: 'In Progress',
  done: 'Done',
};

const TaskAction = ({ task }: TaskActionProps) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  function handleDelete() {
    dispatch(deleteTask(task.id));
    const updatedTasks = {
      newTasks: tasks.newTasks.filter((t: Task) => t.id !== task.id),
      inProgressTasks: tasks.inProgressTasks.filter(
        (t: Task) => t.id !== task.id
      ),
      doneTasks: tasks.doneTasks.filter((t: Task) => t.id !== task.id),
    };
    socket.emit('updateTasks', updatedTasks);
  }

  function handleStageChange(newStage: Stages) {
    const oldStage = task.stage;
    dispatch(updateTaskStage(task.id, newStage));

    const updatedTasks = {
      newTasks: tasks.newTasks,
      inProgressTasks: tasks.inProgressTasks,
      doneTasks: tasks.doneTasks,
    };

    if (oldStage === 'new') {
      updatedTasks.newTasks = tasks.newTasks.filter(
        (t: Task) => t.id !== task.id
      );
    } else if (newStage === 'new') {
      updatedTasks.newTasks = [task, ...tasks.newTasks];
    }

    if (oldStage === 'inProgress') {
      updatedTasks.inProgressTasks = tasks.inProgressTasks.filter(
        (t: Task) => t.id !== task.id
      );
    } else if (newStage === 'inProgress') {
      updatedTasks.inProgressTasks = [task, ...tasks.inProgressTasks];
    }

    if (oldStage === 'done') {
      updatedTasks.doneTasks = tasks.doneTasks.filter(
        (t: Task) => t.id !== task.id
      );
    } else if (newStage === 'done') {
      updatedTasks.doneTasks = [task, ...tasks.doneTasks];
    }

    socket.emit('updateTasks', updatedTasks);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="border-none shadow-none cursor-pointer">
          <MoreHorizontal className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {stages.map((stage) => (
          <DropdownMenuItem
            key={stage}
            onClick={() => handleStageChange(stage)}
            className="flex items-center gap-2 hover:bg-slate-100 hover:cursor-pointer"
            disabled={task.stage === stage}
          >
            {stageMap[stage]}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
          className="text-red-600 focus:text-red-600 flex items-center gap-2 hover:bg-slate-100 hover:cursor-pointer"
          onClick={handleDelete}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskAction;
