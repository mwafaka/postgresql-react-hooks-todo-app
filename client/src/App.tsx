import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Todo{
  id:number;
  task:string;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:3000/todos');
    console.log(response);
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (task.trim() !== '') {
      await axios.post('http://localhost:3000/todos', { task });
      setTask('');
      fetchTodos();
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

