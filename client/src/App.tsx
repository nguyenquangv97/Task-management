import { useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import Dashboard from './components/Dashboard';
import { updateTaskList } from './store/actions/taskActions';

const socket = io('http://localhost:8000');

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('updateTasks', (updatedTasks) => {
      const { newTasks, inProgressTasks, doneTasks } = updatedTasks;
      dispatch(updateTaskList(newTasks, inProgressTasks, doneTasks));
    });
  }, [dispatch]);

  return (
    <div className='App'>
      <section className=''>
        <Dashboard />
      </section>
    </div>
  );
}

export default App;
