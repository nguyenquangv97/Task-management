import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Dashboard from './components/Dashboard';
import { store, persistor } from './store';
import { updateTaskList } from './store/actions/taskActions';

const socket = io('http://localhost:8000');

function App() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    socket.emit('send_message', { message });
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      alert(data.message);
    });

    socket.on('updateTasks', (tasks) => {
      dispatch(updateTaskList(tasks));
    });
  }, [dispatch]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className='App'>
          <section className=''>
            <Dashboard />
          </section>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
