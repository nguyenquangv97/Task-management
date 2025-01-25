import { useState } from 'react';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';

import { Task } from '@/data';
import { cn } from '@/lib/utils';
import TaskAction from './TaskAction';
import { useDispatch } from 'react-redux';
import {toggleImportant} from '../store/actions/taskActions'

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {

  const dispatch = useDispatch();

  return (
    <Card
      className={cn('border shadow-sm', {
        '!opacity-50': task.stage === 'done',
      })}
    >
      <CardHeader className="p-4 pb-2">
        <div className="relative flex flex-row-reverse items-start justify-between gap-4">
          <TaskAction task={task} />
          <div>
            <div className="flex items-center ">
                <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => dispatch(toggleImportant(task.id))}
                >
                <Star className={`h-4 w-4 ${task.important ? 'fill-current text-yellow-500' : ''}`} />
                </Button>
              <h3 className="font-semibold">{task.title}</h3>
            </div>
            <p className="text-sm text-gray-500">{task.company}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              {task.category} - {task.date}
            </p>
            {task.dateRange && (
              <p className="text-sm text-red-500">
                {task.dateRange.start} → {task.dateRange.end}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {task.timeEstimate && (
              <Badge variant="outline" className="bg-green-50">
                {task.timeEstimate}
              </Badge>
            )}
            <div className="flex -space-x-2">
              <Avatar key={task.assignee?.id} className="border-2 border-white">
                <AvatarImage
                  src={task.assignee?.image}
                  alt={task.assignee?.name}
                />
                <AvatarFallback>
                  {task.assignee?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default TaskCard;
