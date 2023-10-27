import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    socket.on('init', (initialTodos) => {
      setTodos(initialTodos);
    });

    socket.on('updateTodos', (updatedTodos) => {
      setTodos(updatedTodos);
    });
  }, []);

  const addTodo = () => {
    socket.emit('addTodo', newTodo);
    setNewTodo('');
  };

  const removeTodo = (index) => {
    socket.emit('removeTodo', index);
  };

  return (
    <div>
      <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo} <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
