
import './App.css'
import React,{ useState } from 'react';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import type { Todo } from './todo.model';

const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {      
    setTodos(prevTodos => [...prevTodos, 
      {id: Math.random().toString(), text: text}
    ]);
  }

 const todoDeleteHandler = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }

  return (
    <>
     <NewTodo onAddTodo={todoAddHandler} />
     <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </>
  )
}

export default App
