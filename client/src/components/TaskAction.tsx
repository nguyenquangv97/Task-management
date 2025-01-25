import { useDispatch } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { MoreHorizontal, Trash } from 'lucide-react';
import { Stages, stages, Task } from '@/data';
import { updateTaskStage, deleteTask } from '../store/actions/taskActions';

interface TaskActionProps {
  task: Task;
}

const stageMap = {
  new: 'New',
  inProgress: 'In Progress',
  done: 'Done',
}

const TaskAction = ({ task }: TaskActionProps) => {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteTask(task.id));
  }

  function onStageChange(newStage: Stages) {
    dispatch(updateTaskStage(task.id, newStage));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="border-none shadow-none">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {stages.map((stage) => (
          <DropdownMenuItem
            key={stage}
            onClick={() => onStageChange(stage)}
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
