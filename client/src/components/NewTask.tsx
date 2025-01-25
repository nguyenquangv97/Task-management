import { RootState } from '@/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { Task, User, initialUsers as users } from '../data';
import { addTask } from '../store/actions/taskActions';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const socket = io('http://localhost:8000');

interface NewTaskProps {
  setIsCreating: (value: boolean) => void;
  stage: 'new' | 'inProgress' | 'done';
  setIsCreatingCurrentStage: (value: boolean) => void;
}

const NewTask = ({
  setIsCreating,
  setIsCreatingCurrentStage,
  stage,
}: NewTaskProps) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskAssignee, setTaskAssignee] = useState<User>();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  function handleSave() {
    const updatedTask: Task = {
      id: uuidv4(),
      stage,
      title: taskTitle,
      assignee: taskAssignee,
      company: 'TechCorp',
      category: 'Development',
      date: new Date().toLocaleDateString(),
    };
    dispatch(addTask(updatedTask));
    setIsCreatingCurrentStage(false);
    setIsCreating(false);

    // Emit the updated task list to the socket server
    const updatedTasks = [...tasks[`${stage}Tasks` as keyof typeof tasks], updatedTask];
    socket.emit('createTask', updatedTasks);
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader className="p-4 pb-2">
        <div className="gap-4">
          <div>
            <Label className="font-semibold">Task Title</Label>
            <div className="mb-2">
              <Input
                className="focus:border-b focus:border-b-slate-200"
                placeholder="Task Title"
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
            <Label className="font-semibold">Assginees</Label>
            <div>
              <Select
                onValueChange={(value) =>
                  setTaskAssignee(users.find((user) => user.name === value))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent className="border-none bg-white">
                  {users.map((user, index) => (
                    <SelectItem key={index} value={user.name}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button
                className="bg-purple-700 text-white border rounded mt-6 hover:bg-purple-800"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                className="ml-2 bg-gray-300 text-black border rounded mt-6 hover:bg-gray-400"
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2"></CardContent>
    </Card>
  );
};
export default NewTask;
