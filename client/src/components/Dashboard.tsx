import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NewTask from './NewTask';
import TaskCard from './TaskCard';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { RootState } from '@/store';
import { Task } from '@/data';

export default function DashBoard() {
  const { newTasks, inProgressTasks, doneTasks } = useSelector((state: RootState) => state.tasks);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingNewTask, setIsCreatingNewTask] = useState(false);
  const [isCreatingNewTaskInProgress, setIsCreatingNewTaskInProgress] =
    useState(false);
  const [isCreatingNewTaskDone, setIsCreatingNewTaskDone] = useState(false);

  const handleCreateTask = (stage: 'new' | 'inProgress' | 'done') => {
    setIsCreatingNewTask(false);
    setIsCreatingNewTaskInProgress(false);
    setIsCreatingNewTaskDone(false);
    setIsCreating(true);
    if (stage === 'new') {
      setIsCreatingNewTask(true);
    } else if (stage === 'inProgress') {
      setIsCreatingNewTaskInProgress(true);
    } else {
      setIsCreatingNewTaskDone(true);
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 p-6">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-lg font-semibold text-purple-700">Projects</h1>
            <div className="flex items-center gap-2">
              <span className="text-base">Development</span>
            </div>
          </div>
        </div>
      </header>
      <div className="w-4/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">New</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleCreateTask('new')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Badge variant="secondary" className="rounded-md">
                {newTasks.length}
              </Badge>
            </div>
            <div className="space-y-4">
              {isCreating && isCreatingNewTask && (
                <NewTask
                  setIsCreating={setIsCreating}
                  setIsCreatingCurrentStage={setIsCreatingNewTask}
                  stage="new"
                />
              )}
              {newTasks.map((task: Task, index: number) => (
                <TaskCard key={`${task.id}-${index}`} task={task} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">In Progress</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleCreateTask('inProgress')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Badge variant="secondary" className="rounded-md">
                {inProgressTasks.length}
              </Badge>
            </div>
            <div className="space-y-4">
              {isCreating && isCreatingNewTaskInProgress && (
                <NewTask
                  setIsCreating={setIsCreating}
                  setIsCreatingCurrentStage={setIsCreatingNewTaskInProgress}
                  stage="inProgress"
                />
              )}
              {inProgressTasks.map((task : Task, index: number) => (
                <TaskCard key={`${task.id}-${index}`} task={task} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Done</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleCreateTask('done')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Badge variant="secondary" className="rounded-md">
                {doneTasks.length}
              </Badge>
            </div>
            <div className="space-y-4">
              {isCreating && isCreatingNewTaskDone && (
                <NewTask
                  setIsCreating={setIsCreating}
                  setIsCreatingCurrentStage={setIsCreatingNewTaskDone}
                  stage="done"
                />
              )}
              {doneTasks.map((task: Task, index: number) => (
                <TaskCard key={`${task.id}-${index}`} task={task} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
