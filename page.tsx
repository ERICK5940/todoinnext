'use client';

import { useState, useEffect } from 'react';
import TodoItem from '../components/TodoItem';

export default function Home() {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (index: number) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const deleteTodo = (index: number) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  return (
    <main className="min-h-screen bg-red-400 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">📝 Todo List</h1>

      <div className="flex gap-2 mb-4 w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Add a new task"
        />
        <button onClick={addTodo} className="bg-blue-800 text-white px-6 py-6 rounded">
          Add
        </button>
      </div>

      <div className="w-full max-w-md">
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo.text}
            index={index}
            completed={todo.completed}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        ))}
      </div>
    </main>
  );
}
